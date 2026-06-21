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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data);
    } catch (err) {
      alert("Failed to load jobs");
    }
  };

  const applyJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Apply failed");
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Available Jobs</h1>

      <div style={styles.jobsContainer}>
        {jobs.length === 0 ? (
          <p style={styles.emptyText}>No jobs available</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <h2 style={styles.jobTitle}>{job.title}</h2>
              <p style={styles.desc}>{job.description}</p>

              <p><b>Company:</b> {job.company}</p>
              <p><b>Skills:</b> {job.skills}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Salary:</b> ₹{job.salary}</p>

              <button onClick={() => applyJob(job.id)} style={styles.applyBtn}>
                Apply Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F8FAFC",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#0F172A",
    marginBottom: "30px",
  },
  jobsContainer: {
    maxWidth: "950px",
    margin: "auto",
  },
  jobCard: {
    background: "#FFFFFF",
    padding: "30px",
    borderRadius: "18px",
    marginBottom: "22px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    borderLeft: "6px solid #2563EB",
  },
  jobTitle: {
    color: "#0F172A",
  },
  desc: {
    color: "#64748B",
    fontSize: "16px",
  },
  emptyText: {
    textAlign: "center",
    color: "#64748B",
    fontSize: "18px",
  },
  applyBtn: {
    marginTop: "15px",
    padding: "12px 24px",
    background: "#2563EB",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Jobs;