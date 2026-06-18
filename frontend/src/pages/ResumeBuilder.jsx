import { useState } from "react";

function ResumeBuilder() {
  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
  });

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  const downloadResume = () => {
    window.print();
  };

  return (
    <div style={{ display: "flex", gap: "30px", padding: "30px" }}>
      <div style={{ width: "40%" }}>
        <h1>Resume Builder</h1>

        {Object.keys(resume).map((field) => (
          <textarea
            key={field}
            name={field}
            placeholder={field.toUpperCase()}
            value={resume[field]}
            onChange={handleChange}
            style={{
              width: "100%",
              marginBottom: "12px",
              padding: "12px",
              borderRadius: "8px",
            }}
          />
        ))}

        <button onClick={downloadResume}>Download / Print Resume</button>
      </div>

      <div
        style={{
          width: "60%",
          background: "white",
          padding: "30px",
          border: "1px solid #ddd",
        }}
      >
        <h1>{resume.name || "Your Name"}</h1>
        <p>{resume.email} | {resume.phone}</p>

        <hr />

        <h2>Skills</h2>
        <p>{resume.skills}</p>

        <h2>Education</h2>
        <p>{resume.education}</p>

        <h2>Experience</h2>
        <p>{resume.experience}</p>

        <h2>Projects</h2>
        <p>{resume.projects}</p>
      </div>
    </div>
  );
}

export default ResumeBuilder;