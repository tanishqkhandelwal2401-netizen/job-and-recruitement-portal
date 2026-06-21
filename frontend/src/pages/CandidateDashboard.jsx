import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function CandidateDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const name = localStorage.getItem("name") || "Candidate";
  const email = localStorage.getItem("email") || "candidate@gmail.com";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const applyJob = async (jobId) => {
    try {
      await API.post(`/apply/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Apply failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>RecruitPro</h2>

        <button style={styles.navBtn}>🏠 Dashboard</button>
        <button style={styles.navBtn} onClick={() => navigate("/jobs")}>💼 Jobs</button>
        <button style={styles.navBtn} onClick={() => navigate("/resume-builder")}>📄 Resume Builder</button>
        <button style={styles.navBtn} onClick={() => navigate("/ats-score")}>📊 ATS Score</button>
        <button style={styles.logout} onClick={logout}>🚪 Logout</button>
      </aside>

      <main style={styles.main}>
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.heading}>Candidate Dashboard</h1>
            <p style={styles.subtext}>Welcome back, {name}</p>
          </div>

          <div style={styles.profile}>
            <div style={styles.avatar}>{name.charAt(0).toUpperCase()}</div>
            <div>
              <b>{name}</b>
              <p style={styles.email}>{email}</p>
            </div>
          </div>
        </div>

        <section style={styles.cards}>
          <div style={styles.card}>
            <h3>💼 Total Jobs</h3>
            <h2>{jobs.length}</h2>
          </div>
          <div style={styles.card}>
            <h3>📄 Resume</h3>
            <h2>Build Now</h2>
          </div>
          <div style={styles.card}>
            <h3>📊 ATS Score</h3>
            <h2>Check</h2>
          </div>
        </section>

        <h2 style={styles.sectionTitle}>Available Jobs</h2>

        <div style={styles.jobGrid}>
          {jobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <h2>{job.title}</h2>
              <p style={styles.desc}>{job.description}</p>

              <p><b>Company:</b> {job.company}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Salary:</b> ₹{job.salary}</p>
              <p><b>Skills:</b> {job.skills}</p>

              <button style={styles.applyBtn} onClick={() => applyJob(job.id)}>
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    background: "#F8FAFC",
    fontFamily: "Inter, Arial, sans-serif",
    color: "#0F172A",
  },
  sidebar: {
    width: "260px",
    background: "#0F172A",
    color: "white",
    padding: "25px 18px",
    position: "fixed",
    height: "100vh",
  },
  logo: {
    marginBottom: "35px",
    color: "#60A5FA",
  },
  navBtn: {
    width: "100%",
    padding: "14px",
    marginBottom: "12px",
    border: "none",
    borderRadius: "12px",
    background: "transparent",
    color: "white",
    textAlign: "left",
    fontSize: "16px",
    cursor: "pointer",
  },
  logout: {
    width: "100%",
    padding: "14px",
    marginTop: "30px",
    border: "none",
    borderRadius: "12px",
    background: "#EF4444",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
  main: {
    marginLeft: "260px",
    padding: "30px",
    width: "100%",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    padding: "22px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  },
  heading: {
    margin: 0,
    fontSize: "32px",
  },
  subtext: {
    color: "#64748B",
    margin: "6px 0 0",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#2563EB",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "20px",
  },
  email: {
    margin: 0,
    color: "#64748B",
    fontSize: "14px",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "25px",
  },
  card: {
    background: "white",
    padding: "24px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    borderLeft: "5px solid #2563EB",
  },
  sectionTitle: {
    marginTop: "35px",
  },
  jobGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
    gap: "22px",
  },
  jobCard: {
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.07)",
  },
  desc: {
    color: "#64748B",
  },
  applyBtn: {
    marginTop: "15px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    background: "#2563EB",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default CandidateDashboard;