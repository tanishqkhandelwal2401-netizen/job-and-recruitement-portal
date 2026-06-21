import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import {
  FaBriefcase,
  FaPlus,
  FaUsers,
  FaChartLine,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

function RecruiterDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name") || "Recruiter";

  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    skills: "",
    description: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
  try {
    const res = await API.get("/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = res.data;

    if (Array.isArray(data)) {
      setJobs(data);
    } else if (Array.isArray(data.jobs)) {
      setJobs(data.jobs);
    } else if (Array.isArray(data.data)) {
      setJobs(data.data);
    } else {
      setJobs([]);
    }
  } catch (err) {
    console.log(err);
    setJobs([]);
  }
};
  const createJob = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Job posted successfully");
      setForm({
        title: "",
        company: "",
        location: "",
        salary: "",
        skills: "",
        description: "",
      });
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.detail || "Job post failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dash-page">
      <aside className="dash-sidebar">
        <h2 className="dash-logo">HireFlow</h2>

        <button className="dash-nav active">
          <FaHome /> Dashboard
        </button>

        <button className="dash-nav">
          <FaBriefcase /> Posted Jobs
        </button>

        <button className="dash-nav">
          <FaUsers /> Candidates
        </button>

        <button className="dash-nav">
          <FaChartLine /> Analytics
        </button>

        <button className="dash-logout" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="dash-main">
        <div className="dash-topbar">
          <div>
            <h1>Welcome, {name}</h1>
            <p>Post jobs, manage openings and track hiring activity.</p>
          </div>

          <button className="gradient-btn">
            <FaPlus /> New Job
          </button>
        </div>

        <section className="dash-stats">
          <div className="dash-card">
            <h3>Total Jobs</h3>
            <h2>{jobs.length}</h2>
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
          <form className="job-form" onSubmit={createJob}>
            <h2>Post a New Job</h2>

            {["title", "company", "location", "salary", "skills"].map((field) => (
              <input
                key={field}
                placeholder={field.toUpperCase()}
                value={form[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                required
              />
            ))}

            <textarea
              placeholder="JOB DESCRIPTION"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />

            <button className="login-btn" type="submit">
              Post Job
            </button>
          </form>

          <div className="posted-jobs">
            <h2>Posted Jobs</h2>

            {jobs.map((job) => (
              <div className="mini-job-card" key={job.id}>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <span>{job.location}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default RecruiterDashboard;