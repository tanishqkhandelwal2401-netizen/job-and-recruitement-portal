import { useState } from "react";

function ResumeBuilder() {
  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    summary: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
    certifications: "",
  });

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  const downloadResume = () => {
    window.print();
  };

  const fields = [
    "name",
    "email",
    "phone",
    "linkedin",
    "portfolio",
    "summary",
    "skills",
    "education",
    "experience",
    "projects",
    "certifications",
  ];

  return (
    <div style={styles.page}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>Resume Builder</h1>
        <p style={styles.subtitle}>Create an ATS-friendly resume.</p>

        {fields.map((field) => (
          <textarea
            key={field}
            name={field}
            placeholder={field.toUpperCase()}
            value={resume[field]}
            onChange={handleChange}
            style={styles.input}
          />
        ))}

        <button onClick={downloadResume} style={styles.button}>
          Download / Print Resume
        </button>
      </div>

      <div style={styles.preview}>
        <h1 style={styles.name}>{resume.name || "Your Name"}</h1>

        <p style={styles.contact}>
          {resume.email || "email@example.com"} | {resume.phone || "Phone"}
        </p>

        <p style={styles.contact}>
          {resume.linkedin || "LinkedIn"} | {resume.portfolio || "Portfolio"}
        </p>

        <hr />

        <Section title="Professional Summary" value={resume.summary} />
        <Section title="Skills" value={resume.skills} />
        <Section title="Education" value={resume.education} />
        <Section title="Experience" value={resume.experience} />
        <Section title="Projects" value={resume.projects} />
        <Section title="Certifications" value={resume.certifications} />
      </div>
    </div>
  );
}

function Section({ title, value }) {
  return (
    <div style={{ marginTop: "22px" }}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <p style={styles.sectionText}>{value || `Add your ${title.toLowerCase()} here...`}</p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    gap: "30px",
    padding: "30px",
    background: "#F8FAFC",
    fontFamily: "Arial, sans-serif",
  },
  formBox: {
    width: "40%",
    background: "#FFFFFF",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
  title: {
    color: "#0F172A",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#64748B",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    minHeight: "55px",
    marginBottom: "12px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #CBD5E1",
    resize: "vertical",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#2563EB",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  preview: {
    width: "60%",
    background: "#FFFFFF",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    color: "#0F172A",
  },
  name: {
    color: "#2563EB",
    marginBottom: "8px",
  },
  contact: {
    color: "#64748B",
    margin: "4px 0",
  },
  sectionTitle: {
    fontSize: "18px",
    color: "#14B8A6",
    borderBottom: "1px solid #E2E8F0",
    paddingBottom: "5px",
  },
  sectionText: {
    whiteSpace: "pre-line",
    color: "#334155",
    lineHeight: "1.6",
  },
};

export default ResumeBuilder;