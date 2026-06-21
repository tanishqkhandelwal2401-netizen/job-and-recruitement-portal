import { useState } from "react";
import { Link } from "react-router-dom";

function ATSScore() {
  const [resumeText, setResumeText] = useState("");
  const [jobSkills, setJobSkills] = useState("");
  const [result, setResult] = useState(null);

  const calculateATS = () => {
    const resume = resumeText.toLowerCase();

    const skills = jobSkills
      .toLowerCase()
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const matched = [];
    const missing = [];

    skills.forEach((skill) => {
      if (resume.includes(skill)) {
        matched.push(skill);
      } else {
        missing.push(skill);
      }
    });

    let score = 35;

    if (resume.length > 300) score += 10;
    if (resume.length > 600) score += 10;
    if (resume.includes("education")) score += 10;
    if (resume.includes("experience")) score += 10;
    if (resume.includes("project")) score += 10;
    if (resume.includes("skills")) score += 10;

    if (skills.length > 0) {
      score += Math.round((matched.length / skills.length) * 15);
    }

    if (score > 100) score = 100;

    setResult({
      score,
      matched,
      missing,
    });
  };

  return (
    <div style={styles.page}>
      <Link to="/candidate-dashboard" style={styles.backBtn}>
        ← Back
      </Link>

      <div style={styles.card}>
        <h1 style={styles.title}>ATS Resume Score</h1>
        <p style={styles.subtitle}>
          Paste your resume and required skills to check your ATS compatibility.
        </p>

        <label style={styles.label}>Required Job Skills</label>
        <input
          value={jobSkills}
          onChange={(e) => setJobSkills(e.target.value)}
          placeholder="Python, React, FastAPI, SQL"
          style={styles.input}
        />

        <label style={styles.label}>Resume Text</label>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume here..."
          style={styles.textarea}
        />

        <button onClick={calculateATS} style={styles.button}>
          Check ATS Score
        </button>

        {result && (
          <div style={styles.resultBox}>
            <h2 style={styles.score}>ATS Score: {result.score}%</h2>

            <div style={styles.scoreBar}>
              <div
                style={{
                  ...styles.scoreFill,
                  width: `${result.score}%`,
                }}
              ></div>
            </div>

            <h3 style={styles.darkText}>Matched Skills</h3>
            <p style={styles.goodText}>
              {result.matched.length
                ? result.matched.join(", ")
                : "No matched skills"}
            </p>

            <h3 style={styles.darkText}>Missing Skills</h3>
            <p style={styles.badText}>
              {result.missing.length
                ? result.missing.join(", ")
                : "No missing skills"}
            </p>
          </div>
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
  backBtn: {
    textDecoration: "none",
    background: "#0F172A",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
  },
  card: {
    maxWidth: "900px",
    margin: "30px auto",
    background: "#FFFFFF",
    padding: "35px",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },
  title: {
    color: "#0F172A",
    fontSize: "38px",
  },
  subtitle: {
    color: "#64748B",
  },
  label: {
    display: "block",
    marginTop: "20px",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#0F172A",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #CBD5E1",
  },
  textarea: {
    width: "100%",
    height: "260px",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #CBD5E1",
    resize: "vertical",
  },
  button: {
    marginTop: "20px",
    width: "100%",
    padding: "14px",
    background: "#2563EB",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "25px",
    padding: "25px",
    borderRadius: "16px",
    background: "#F1F5F9",
  },
  score: {
    color: "#14B8A6",
  },
  scoreBar: {
    width: "100%",
    height: "14px",
    background: "#CBD5E1",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  scoreFill: {
    height: "100%",
    background: "#14B8A6",
  },
  darkText: {
    color: "#0F172A",
  },
  goodText: {
    color: "#15803D",
  },
  badText: {
    color: "#DC2626",
  },
};

export default ATSScore;