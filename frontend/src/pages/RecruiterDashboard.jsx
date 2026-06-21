import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function RecruiterDashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    skills: "",
    salary: "",
  });

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setJobs(res.data);
    } catch (err) {
      alert("Failed to load jobs");
    }
  };

  const createJob = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/jobs",
        {
          ...form,
          salary: Number(form.salary),
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      alert("Job posted successfully");

      setForm({
        title: "",
        company: "",
        location: "",
        description: "",
        skills: "",
        salary: "",
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
    <div style={styles.page}>
      <div style={styles.topbar}>
        <div>
          <h1 style={styles.heading}>Recruiter Dashboard</h1>
          <p style={styles.subText}>Post jobs and manage openings</p>
        </div>

        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.card}>
          <h3>Total Jobs</h3>
          <h1>{jobs.length}</h1>
        </div>

        <div style={styles.card}>
          <h3>Active Jobs</h3>
          <h1>{jobs.length}</h1>
        </div>

        <div style={styles.card}>
          <h3>Recruiter</h3>
          <h1>👤</h1>
        </div>
      </div>

      <form onSubmit={createJob} style={styles.formCard}>
        <h2 style={styles.formTitle}>Post New Job</h2>

        <input
          style={styles.input}
          placeholder="Job Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          style={styles.input}
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          required
        />

        <input
          style={styles.input}
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <input
          style={styles.input}
          placeholder="Skills Required"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
          required
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
          required
        />

        <textarea
          style={styles.textarea}
          placeholder="Job Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <button type="submit" style={styles.postBtn}>
          Post Job
        </button>
      </form>

      <h2 style={styles.sectionTitle}>Posted Jobs</h2>

      {jobs.length === 0 ? (
        <p style={styles.emptyText}>No jobs posted yet</p>
      ) : (
        <div style={styles.jobsGrid}>
          {jobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <h3 style={styles.jobTitle}>{job.title}</h3>
              <p style={styles.description}>{job.description}</p>

              <p>
                <b>Company:</b> {job.company}
              </p>

              <p>
                <b>Location:</b> {job.location}
              </p>

              <p>
                <b>Skills:</b> {job.skills}
              </p>

              <p>
                <b>Salary:</b> ₹{job.salary}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F8FAFC",
    padding: "35px",
    fontFamily: "Arial, sans-serif",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#FFFFFF",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    marginBottom: "25px",
  },

  heading: {
    color: "#0F172A",
    margin: 0,
  },

  subText: {
    color: "#64748B",
    marginTop: "8px",
  },

  logoutBtn: {
    background: "#EF4444",
    color: "#FFFFFF",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "25px",
  },

  card: {
    background: "#FFFFFF",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
    color: "#0F172A",
  },

  formCard: {
    background: "#FFFFFF",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "800px",
    margin: "0 auto 35px",
  },

  formTitle: {
    color: "#0F172A",
    textAlign: "center",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #CBD5E1",
    fontSize: "16px",
    outline: "none",
  },

  textarea: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #CBD5E1",
    fontSize: "16px",
    minHeight: "120px",
    resize: "vertical",
    outline: "none",
  },

  postBtn: {
    background: "#2563EB",
    color: "#FFFFFF",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },

  sectionTitle: {
    color: "#0F172A",
    textAlign: "center",
    marginBottom: "20px",
  },

  emptyText: {
    color: "#64748B",
    textAlign: "center",
  },

  jobsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },

  jobCard: {
    background: "#FFFFFF",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    borderLeft: "6px solid #2563EB",
    color: "#0F172A",
  },

  jobTitle: {
    color: "#2563EB",
  },

  description: {
    color: "#64748B",
  },
};

export default RecruiterDashboard;