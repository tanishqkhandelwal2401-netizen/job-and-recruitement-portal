import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function RecruiterDashboard() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    description: "",
    skills: "",
    location: "",
    salary: "",
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
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Job posted successfully");

      setJob({
        title: "",
        company: "",
        description: "",
        skills: "",
        location: "",
        salary: "",
      });
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to post job");
    }
  };

  return (
    <div className="dash-page">
      <aside className="dash-sidebar">
        <h1 className="dash-logo">HireFlow</h1>

        <button className="dash-nav active" onClick={() => scrollToSection("dashboard")}>
          🏠 Dashboard
        </button>

        <button className="dash-nav" onClick={() => scrollToSection("new-job")}>
          ➕ New Job
        </button>

        <button className="dash-nav" onClick={() => scrollToSection("posted-jobs")}>
          💼 Posted Jobs
        </button>

        <button className="dash-nav" onClick={() => scrollToSection("candidates")}>
          👥 Candidates
        </button>

        <button className="dash-nav" onClick={() => scrollToSection("analytics")}>
          📊 Analytics
        </button>

        <button className="dash-logout" onClick={logout}>
          🚪 Logout
        </button>
      </aside>

      <main className="dash-main">
        <section id="dashboard" className="dash-topbar">
          <div>
            <h1>Welcome, Recruiter</h1>
            <p>Post jobs, manage candidates and track hiring analytics.</p>
          </div>

          <button className="gradient-btn" onClick={() => scrollToSection("new-job")}>
            + New Job
          </button>
        </section>

        <section id="analytics" className="dash-stats">
          <div className="dash-card">
            <h3>Total Jobs</h3>
            <h2>15</h2>
          </div>

          <div className="dash-card">
            <h3>Applications</h3>
            <h2>24</h2>
          </div>

          <div className="dash-card">
            <h3>Shortlisted</h3>
            <h2>8</h2>
          </div>

          <div className="dash-card">
            <h3>Interviews</h3>
            <h2>3</h2>
          </div>
        </section>

        <div className="recruiter-grid">
          <section id="new-job" className="job-form">
            <h2>Post a New Job</h2>

            <form onSubmit={postJob}>
              <input
                placeholder="Job Title"
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
              />

              <input
                placeholder="Company Name"
                value={job.company}
                onChange={(e) => setJob({ ...job, company: e.target.value })}
              />

              <input
                placeholder="Location"
                value={job.location}
                onChange={(e) => setJob({ ...job, location: e.target.value })}
              />

              <input
                placeholder="Salary"
                value={job.salary}
                onChange={(e) => setJob({ ...job, salary: e.target.value })}
              />

              <input
                placeholder="Skills Required"
                value={job.skills}
                onChange={(e) => setJob({ ...job, skills: e.target.value })}
              />

              <textarea
                placeholder="Job Description"
                value={job.description}
                onChange={(e) => setJob({ ...job, description: e.target.value })}
              />

              <button className="gradient-btn" type="submit">
                Post Job
              </button>
            </form>
          </section>

          <section id="posted-jobs" className="posted-jobs">
            <h2>Posted Jobs</h2>

            <div className="mini-job-card">
              <h3>Python Developer Intern</h3>
              <p>Tech Solutions</p>
              <span>Mumbai</span>
            </div>

            <div className="mini-job-card">
              <h3>Frontend Developer</h3>
              <p>Infosys</p>
              <span>Pune</span>
            </div>

            <div className="mini-job-card">
              <h3>Data Analyst</h3>
              <p>TCS</p>
              <span>Mumbai</span>
            </div>
          </section>
        </div>

        <section id="candidates" className="posted-jobs" style={{ marginTop: "30px" }}>
          <h2>Candidates</h2>

          <div className="mini-job-card">
            <h3>Aarav Sharma</h3>
            <p>Skills: Python, FastAPI, React</p>
            <span>Status: Applied</span>
          </div>

          <div className="mini-job-card">
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