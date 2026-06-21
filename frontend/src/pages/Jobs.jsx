import { useEffect, useState } from "react";
import API from "../api";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;

      if (Array.isArray(data)) setJobs(data);
      else if (Array.isArray(data.jobs)) setJobs(data.jobs);
      else if (Array.isArray(data.data)) setJobs(data.data);
      else setJobs([]);
    } catch (err) {
      alert("Failed to load jobs");
      setJobs([]);
    }
  };

  const applyJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/apply/${jobId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Apply failed");
    }
  };

  return (
    <div className="jobs-page">
      <div className="jobs-hero">
        <p className="eyebrow">CAREER OPPORTUNITIES</p>
        <h1>Find your next role</h1>
        <p>Apply to jobs that match your skills, resume and career goals.</p>
      </div>

      <div className="jobs-grid">
        {jobs.length === 0 ? (
          <div className="empty-box">No jobs available</div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="premium-job-card">
              <div>
                <h2>{job.title}</h2>
                <p className="company">{job.company}</p>
              </div>

              <p className="job-desc">{job.description}</p>

              <div className="job-tags">
                <span>{job.skills || "Skills not added"}</span>
              </div>

              <div className="job-meta">
                <p>📍 {job.location}</p>
                <p>💰 ₹{job.salary}</p>
              </div>

              <button onClick={() => applyJob(job.id)} className="login-btn">
                Apply Now →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Jobs;