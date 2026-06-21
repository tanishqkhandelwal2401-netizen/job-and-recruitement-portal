from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware

from database import supabase
from models import UserSignup, UserLogin, JobCreate, StatusUpdate, ATSRequest, ResumeBuilder
from auth import hash_password, verify_password, create_token, verify_token

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/")
def home():
    return {"message": "Smart Recruitment & Placement Portal Backend"}


@app.post("/signup")
def signup(user: UserSignup):
    try:
        existing = supabase.table("users").select("*").eq("email", user.email).execute()

        if existing.data:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed = hash_password(user.password)

        data = {
            "name": user.name,
            "email": user.email,
            "password": hashed,
            "role": user.role
        }

        res = supabase.table("users").insert(data).execute()

        return {
            "message": "User registered successfully",
            "user": res.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@app.post("/signup")
def signup(user: UserSignup):
    print("Password received:", user.password)

@app.post("/login")
def login(user: UserLogin):
    existing = supabase.table("users").select("*").eq("email", user.email).execute()

    if not existing.data:
        raise HTTPException(status_code=404, detail="User not found")

    db_user = existing.data[0]

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({
        "id": db_user["id"],
        "role": db_user["role"]
    })

    return {
        "access_token": token,
        "role": db_user["role"],
        "name": db_user["name"],
        "email": db_user["email"]
    }

@app.post("/jobs")
def create_job(job: JobCreate, user=Depends(verify_token)):
    if user["role"] != "recruiter":
        raise HTTPException(status_code=403, detail="Only recruiter can post jobs")

    data = {
        "title": job.title,
        "company": job.company,
        "description": job.description,
        "skills": job.skills,
        "location": job.location,
        "salary": job.salary,
        "recruiter_id": user["id"]
    }

    res = supabase.table("jobs").insert(data).execute()

    return {
        "message": "Job posted successfully",
        "job": res.data
    }


@app.get("/jobs")
def get_jobs():
    res = supabase.table("jobs").select("*").execute()
    return res.data


@app.post("/apply/{job_id}")
def apply_job(job_id: str, user=Depends(verify_token)):
    if user["role"] != "candidate":
        raise HTTPException(status_code=403, detail="Only candidates can apply")

    data = {
        "job_id": job_id,
        "candidate_id": user["id"],
        "status": "Applied"
    }

    res = supabase.table("applications").insert(data).execute()

    return {
        "message": "Applied successfully",
        "application": res.data
    }


@app.get("/my-applications")
def my_applications(user=Depends(verify_token)):
    res = supabase.table("applications").select("*").eq("candidate_id", user["id"]).execute()
    return res.data


@app.get("/recruiter/applications")
def recruiter_applications(user=Depends(verify_token)):
    if user["role"] != "recruiter":
        raise HTTPException(status_code=403, detail="Only recruiter can view applications")

    res = supabase.table("applications").select("*").execute()
    return res.data


@app.put("/applications/{application_id}/status")
def update_status(application_id: str, status: StatusUpdate, user=Depends(verify_token)):
    if user["role"] != "recruiter":
        raise HTTPException(status_code=403, detail="Only recruiter can update status")

    res = supabase.table("applications").update({
        "status": status.status
    }).eq("id", application_id).execute()

    return {
        "message": "Status updated",
        "application": res.data
    }


@app.get("/analytics")
def analytics(user=Depends(verify_token)):
    jobs = supabase.table("jobs").select("*").execute()
    applications = supabase.table("applications").select("*").execute()
    users = supabase.table("users").select("*").execute()

    return {
        "total_jobs": len(jobs.data),
        "total_applications": len(applications.data),
        "total_users": len(users.data)
    }
@app.post("/ats-score/{job_id}")
def ats_score(job_id: str, data: ATSRequest, user=Depends(verify_token)):
    job = supabase.table("jobs").select("*").eq("id", job_id).execute()

    if not job.data:
        raise HTTPException(status_code=404, detail="Job not found")

    job_skills = job.data[0]["skills"].lower().split(",")
    resume_text = data.resume_text.lower()

    matched_skills = []
    missing_skills = []

    for skill in job_skills:
        skill = skill.strip()

        if skill in resume_text:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    score = int((len(matched_skills) / len(job_skills)) * 100) if job_skills else 0

    return {
        "ats_score": score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "message": "ATS score generated successfully"
    }


@app.post("/resume-builder")
def resume_builder(resume: ResumeBuilder, user=Depends(verify_token)):
    resume_text = f"""
{resume.name}
Email: {resume.email}
Phone: {resume.phone}

Career Objective:
{resume.objective}

Education:
{resume.education}

Skills:
{resume.skills}

Experience:
{resume.experience}

Projects:
{resume.projects}

Certifications:
{resume.certifications}
"""

    data = {
        "candidate_id": user["id"],
        "resume_text": resume_text
    }

    res = supabase.table("resumes").insert(data).execute()

    return {
        "message": "Resume created successfully",
        "resume": resume_text,
        "saved_data": res.data
    }