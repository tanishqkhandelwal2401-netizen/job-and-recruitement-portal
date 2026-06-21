import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);
  const [userEmail, setUserEmail] = useState("Loading...");

  useEffect(() => {
    fetchJobs();
    setUserEmail(localStorage.getItem("email") || "Candidate");
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
      <h1 style={styles.heading}>Candidate Dashboard</h1>

      <div style={styles.profileCard}>
        <h2 style={styles.darkText}>Welcome Candidate</h2>
        <p style={styles.mutedText}>Email: {userEmail}</p>
      </div>

      <div style={styles.featureGrid}>
        <Link to="/jobs" style={styles.featureCard}>
          <h2>💼 Jobs</h2>
          <p>View and apply for jobs</p>
        </Link>

        <Link to="/resume-builder" style={styles.featureCard}>
          <h2>📄 Resume Builder</h2>
          <p>Create a professional resume</p>
        </Link>

        <Link to="/ats-score" style={styles.featureCard}>
          <h2>📊 ATS Score</h2>
          <p>Check resume compatibility</p>
        </Link>
      </div>

      <h2 style={styles.sectionHeading}>Available Jobs</h2>

      <div style={styles.jobsContainer}>
        {jobs.length === 0 ? (
          <p style={styles.mutedText}>No jobs available</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <h2 style={styles.jobTitle}>{job.title}</h2>
              <p style={styles.mutedText}>{job.description}</p>

              <p style={styles.darkText}>
                <b>Company:</b> {job.company}
              </p>

              <p style={styles.darkText}>
                <b>Location:</b> {job.location}
              </p>

              <p style={styles.darkText}>
                <b>Salary:</b> ₹{job.salary}
              </p>

              <button onClick={() => applyJob(job.id)} style={styles.applyBtn}>
                Apply
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
    fontSize: "42px",
  },
  profileCard: {
    background: "#FFFFFF",
    padding: "25px",
    borderRadius: "18px",
    textAlign: "center",
    margin: "25px auto",
    maxWidth: "900px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },
  darkText: {
    color: "#0F172A",
  },
  mutedText: {
    color: "#64748B",
    fontSize: "17px",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "20px",
    maxWidth: "1000px",
    margin: "30px auto",
  },
  featureCard: {
    background: "#FFFFFF",
    padding: "28px",
    borderRadius: "18px",
    textDecoration: "none",
    color: "#0F172A",
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    borderTop: "5px solid #2563EB",
  },
  sectionHeading: {
    textAlign: "center",
    color: "#0F172A",
    marginTop: "45px",
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
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    borderLeft: "6px solid #2563EB",
  },
  jobTitle: {
    color: "#0F172A",
  },
  applyBtn: {
    padding: "12px 24px",
    background: "#2563EB",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default CandidateDashboard;