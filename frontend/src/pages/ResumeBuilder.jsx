import { useState } from "react";
import API from "../api";

function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    objective: "",
    education: "",
    skills: "",
    experience: "",
    projects: "",
    certifications: "",
  });

  const [resume, setResume] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await API.post("/resume-builder", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResume(res.data.resume || res.data.resume_text || "Resume generated successfully");
      alert("Resume generated successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Resume generation failed");
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Resume Builder</h1>

      <form onSubmit={handleSubmit} style={styles.formCard}>
        {Object.keys(form).map((field) =>
          field === "objective" ||
          field === "education" ||
          field === "experience" ||
          field === "projects" ||
          field === "certifications" ? (
            <textarea
              key={field}
              placeholder={field.toUpperCase()}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              style={styles.textarea}
              required
            />
          ) : (
            <input
              key={field}
              placeholder={field.toUpperCase()}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              style={styles.input}
              required
            />
          )
        )}

        <button type="submit" style={styles.button}>
          Generate Resume
        </button>
      </form>

      {resume && (
        <div style={styles.resumeBox}>
          <h2>Generated Resume</h2>
          <pre style={styles.resumeText}>{resume}</pre>
        </div>
      )}
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
  },
  formCard: {
    maxWidth: "800px",
    margin: "30px auto",
    background: "#FFFFFF",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "14px",
    border: "1px solid #CBD5E1",
    borderRadius: "10px",
    fontSize: "16px",
  },
  textarea: {
    padding: "14px",
    border: "1px solid #CBD5E1",
    borderRadius: "10px",
    fontSize: "16px",
    minHeight: "90px",
  },
  button: {
    background: "#2563EB",
    color: "#FFFFFF",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  resumeBox: {
    maxWidth: "800px",
    margin: "30px auto",
    background: "#FFFFFF",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },
  resumeText: {
    whiteSpace: "pre-wrap",
    color: "#0F172A",
    fontSize: "15px",
  },
};

export default ResumeBuilder;