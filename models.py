from pydantic import BaseModel


class UserSignup(BaseModel):
    name: str
    email: str
    password: str
    role: str


class UserLogin(BaseModel):
    email: str
    password: str


class JobCreate(BaseModel):
    title: str
    company: str
    description: str
    skills: str
    location: str
    salary: str


class StatusUpdate(BaseModel):
    status: str


class ATSRequest(BaseModel):
    resume_text: str


class ResumeBuilder(BaseModel):
    name: str
    email: str
    phone: str
    objective: str
    education: str
    skills: str
    experience: str
    projects: str
    certifications: str