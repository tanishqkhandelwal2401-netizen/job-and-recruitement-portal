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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateResume = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await API.post("/resume-builder", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResume(res.data.resume || res.data.resume_text || res.data);
      alert("Resume generated successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Resume generation failed");
    }
  };

  return (
    <div className="resume-page">
      <div className="resume-header">
        <p className="eyebrow">RESUME BUILDER</p>
        <h1>Create an ATS-ready resume</h1>
        <p>Fill your details and generate a clean professional resume.</p>
      </div>

      <div className="resume-layout">
        <form className="resume-form" onSubmit={generateResume}>
          {Object.keys(form).map((field) =>
            field === "objective" ||
            field === "education" ||
            field === "skills" ||
            field === "experience" ||
            field === "projects" ||
            field === "certifications" ? (
              <textarea
                key={field}
                name={field}
                placeholder={field.toUpperCase()}
                value={form[field]}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                key={field}
                name={field}
                placeholder={field.toUpperCase()}
                value={form[field]}
                onChange={handleChange}
                required
              />
            )
          )}

          <button className="login-btn" type="submit">
            Generate Resume
          </button>
        </form>

        <div className="resume-preview">
          <h2>Resume Preview</h2>
          <pre>{resume || "Your generated resume will appear here..."}</pre>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;