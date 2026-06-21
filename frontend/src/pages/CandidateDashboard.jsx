import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import {
  FaHome,
  FaBriefcase,
  FaFileAlt,
  FaChartLine,
  FaBell,
  FaBookmark,
  FaUser,
  FaSignOutAlt,
  FaSearch,
  FaMapMarkerAlt,
  FaRupeeSign,
} from "react-icons/fa";

function CandidateDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name") || "Candidate";
  const email = localStorage.getItem("email") || "candidate@gmail.com";

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

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>HireFlow</h2>

        <button style={styles.activeNav}>
          <FaHome /> Dashboard
        </button>

        <button style={styles.navBtn} onClick={() => navigate("/jobs")}>
          <FaBriefcase /> Browse Jobs
        </button>

        <button style={styles.navBtn} onClick={() => navigate("/resume-builder")}>
          <FaFileAlt /> Resume Builder
        </button>

        <button style={styles.navBtn} onClick={() => navigate("/ats-score")}>
          <FaChartLine /> ATS Checker
        </button>

        <button style={styles.navBtn}>
          <FaBookmark /> Saved Jobs
        </button>

        <button style={styles.navBtn}>
          <FaBell /> Notifications
        </button>

        <button style={styles.logout} onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main style={styles.main}>
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.heading}>Welcome back, {name}</h1>
            <p style={styles.subtext}>Track jobs, resumes and applications in one place.</p>
          </div>

          <div style={styles.profileBox}>
            <div style={styles.avatar}>{name.charAt(0).toUpperCase()}</div>
            <div>
              <b>{name}</b>
              <p style={styles.email}>{email}</p>
            </div>
          </div>
        </div>

        <div style={styles.searchBox}>
          <FaSearch />
          <input
            style={styles.searchInput}
            placeholder="Search jobs, companies, skills..."
          />
        </div>

        <section style={styles.stats}>
          <div style={styles.statCard}>
            <h3>💼 Total Jobs</h3>
            <h2>{jobs.length}</h2>
          </div>

          <div style={styles.statCard}>
            <h3>📄 Resume Status</h3>
            <h2>Ready</h2>
          </div>

          <div style={styles.statCard}>
            <h3>📊 Profile Score</h3>
            <h2>85%</h2>
          </div>

          <div style={styles.statCard}>
            <h3>⭐ Saved Jobs</h3>
            <h2>0</h2>
          </div>
        </section>

        <h2 style={styles.sectionTitle}>Recommended Jobs</h2>

        <div style={styles.jobGrid}>
          {jobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <div style={styles.jobTop}>
                <div>
                  <h2 style={styles.jobTitle}>{job.title}</h2>
                  <p style={styles.company}>{job.company}</p>
                </div>
                <button style={styles.saveBtn}>♡</button>
              </div>

              <p style={styles.description}>{job.description}</p>

              <div style={styles.tags}>
                <span style={styles.tag}>{job.skills}</span>
              </div>

              <div style={styles.jobInfo}>
                <span>
                  <FaMapMarkerAlt /> {job.location}
                </span>
                <span>
                  <FaRupeeSign /> {job.salary}
                </span>
              </div>

              <button style={styles.applyBtn} onClick={() => applyJob(job.id)}>
                Apply Now →
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
    background: "#0F172A",
    fontFamily: "Inter, Arial, sans-serif",
    color: "#F8FAFC",
  },

  sidebar: {
    width: "260px",
    height: "100vh",
    position: "fixed",
    background: "linear-gradient(180deg, #111827, #1E1B4B)",
    padding: "25px 18px",
    boxSizing: "border-box",
  },

  logo: {
    fontSize: "28px",
    marginBottom: "35px",
    background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  navBtn: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "12px",
    border: "none",
    borderRadius: "14px",
    background: "transparent",
    color: "#CBD5E1",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    transition: "0.3s",
  },

  activeNav: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "12px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    color: "#fff",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(99,102,241,.4)",
  },

  logout: {
    width: "100%",
    padding: "14px 16px",
    marginTop: "35px",
    border: "none",
    borderRadius: "14px",
    background: "#EF4444",
    color: "#fff",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  },

  main: {
    marginLeft: "260px",
    width: "100%",
    padding: "30px",
  },

  topbar: {
    background: "rgba(30,41,59,.85)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "24px",
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 20px 50px rgba(0,0,0,.25)",
  },

  heading: {
    margin: 0,
    fontSize: "30px",
  },

  subtext: {
    color: "#94A3B8",
    marginTop: "8px",
  },

  profileBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "#334155",
    padding: "12px 18px",
    borderRadius: "18px",
  },

  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "20px",
  },

  email: {
    margin: 0,
    color: "#94A3B8",
    fontSize: "13px",
  },

  searchBox: {
    marginTop: "25px",
    background: "#1E293B",
    borderRadius: "18px",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "1px solid rgba(255,255,255,.08)",
  },

  searchInput: {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "16px",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginTop: "25px",
  },

  statCard: {
    background: "linear-gradient(145deg, #1E293B, #334155)",
    padding: "24px",
    borderRadius: "22px",
    border: "1px solid rgba(255,255,255,.08)",
    boxShadow: "0 18px 40px rgba(0,0,0,.25)",
  },

  sectionTitle: {
    marginTop: "35px",
    marginBottom: "20px",
  },

  jobGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "22px",
  },

  jobCard: {
    background: "#1E293B",
    padding: "24px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,.08)",
    boxShadow: "0 18px 45px rgba(0,0,0,.28)",
  },

  jobTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  jobTitle: {
    margin: 0,
  },

  company: {
    color: "#06B6D4",
    marginTop: "6px",
  },

  saveBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: "none",
    background: "#334155",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
  },

  description: {
    color: "#CBD5E1",
    lineHeight: "1.6",
  },

  tags: {
    marginTop: "15px",
  },

  tag: {
    background: "rgba(99,102,241,.18)",
    color: "#A5B4FC",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "13px",
  },

  jobInfo: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    color: "#94A3B8",
  },

  applyBtn: {
    width: "100%",
    marginTop: "22px",
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "15px",
    boxShadow: "0 12px 25px rgba(99,102,241,.35)",
  },
};

export default CandidateDashboard;