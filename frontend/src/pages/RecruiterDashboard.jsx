import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function RecruiterDashboard() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    skills: "",
    description: "",
  });

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const postJob = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/jobs", job, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job posted successfully");

      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        skills: "",
        description: "",
      });
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to post job");
    }
  };

  return (
    <div className="recruiter-layout">
      <aside className="sidebar">
        <h1>HireFlow</h1>

        <button onClick={() => scrollToSection("dashboard")}>
          🏠 Dashboard
        </button>

        <button onClick={() => scrollToSection("posted-jobs")}>
          💼 Posted Jobs
        </button>

        <button onClick={() => scrollToSection("candidates")}>
          👥 Candidates
        </button>

        <button onClick={() => scrollToSection("analytics")}>
          📊 Analytics
        </button>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <section id="dashboard" className="welcome-card">
          <div>
            <h2>Welcome, Recruiter</h2>
            <p>Post jobs, manage openings and track hiring activity.</p>
          </div>

          <button onClick={() => scrollToSection("new-job")}>
            + New Job
          </button>
        </section>

        <section id="analytics" className="stats-grid">
          <div className="stat-card">
            <p>Total Jobs</p>
            <h2>15</h2>
          </div>

          <div className="stat-card">
            <p>Applications</p>
            <h2>24</h2>
          </div>

          <div className="stat-card">
            <p>Shortlisted</p>
            <h2>8</h2>
          </div>

          <div className="stat-card">
            <p>Interviews</p>
            <h2>3</h2>
          </div>
        </section>

        <div className="dashboard-grid">
          <section id="new-job" className="panel-card">
            <h2>Post a New Job</h2>

            <form onSubmit={postJob}>
              <input
                placeholder="TITLE"
                value={job.title}
                onChange={(e) =>
                  setJob({ ...job, title: e.target.value })
                }
              />

              <input
                placeholder="COMPANY"
                value={job.company}
                onChange={(e) =>
                  setJob({ ...job, company: e.target.value })
                }
              />

              <input
                placeholder="LOCATION"
                value={job.location}
                onChange={(e) =>
                  setJob({ ...job, location: e.target.value })
                }
              />

              <input
                placeholder="SALARY"
                value={job.salary}
                onChange={(e) =>
                  setJob({ ...job, salary: e.target.value })
                }
              />

              <input
                placeholder="SKILLS"
                value={job.skills}
                onChange={(e) =>
                  setJob({ ...job, skills: e.target.value })
                }
              />

              <textarea
                placeholder="JOB DESCRIPTION"
                value={job.description}
                onChange={(e) =>
                  setJob({ ...job, description: e.target.value })
                }
              />

              <button type="submit">Post Job</button>
            </form>
          </section>

          <section id="posted-jobs" className="panel-card">
            <h2>Posted Jobs</h2>

            <div className="job-card">
              <h3>Python Developer Intern</h3>
              <p>Tech Solutions</p>
              <span>Mumbai</span>
            </div>

            <div className="job-card">
              <h3>Frontend Developer</h3>
              <p>Infosys</p>
              <span>Pune</span>
            </div>

            <div className="job-card">
              <h3>Data Analyst</h3>
              <p>TCS</p>
              <span>Mumbai</span>
            </div>
          </section>
        </div>

        <section id="candidates" className="panel-card">
          <h2>Candidates</h2>

          <div className="job-card">
            <h3>Aarav Sharma</h3>
            <p>Skills: Python, FastAPI, React</p>
            <span>Status: Applied</span>
          </div>

          <div className="job-card">
            <h3>Kalyani Jaiswal</h3>
            <p>Skills: Graphic Design, React, Python</p>
            <span>Status: Shortlisted</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default RecruiterDashboard;