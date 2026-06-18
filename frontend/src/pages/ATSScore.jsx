import { useState } from "react";

function ATSScore() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [score, setScore] = useState(null);

  const calculateScore = () => {
    if (!resume || !jobDesc) {
      alert("Please enter resume and job description");
      return;
    }

    const resumeWords = resume.toLowerCase().split(/\W+/);
    const jobWords = jobDesc.toLowerCase().split(/\W+/);

    const matchedWords = jobWords.filter((word) =>
      resumeWords.includes(word)
    );

    const uniqueMatched = [...new Set(matchedWords)];

    const atsScore = Math.round(
      (uniqueMatched.length / new Set(jobWords).size) * 100
    );

    setScore(atsScore);
  };

  return (
    <div style={{ padding: "30px", background: "#F8FAFC", minHeight: "100vh" }}>
      <h1>ATS Resume Score</h1>

      <textarea
        placeholder="Paste your resume text here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        style={{ width: "100%", height: "180px", marginBottom: "15px" }}
      />

      <textarea
        placeholder="Paste job description here..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        style={{ width: "100%", height: "180px", marginBottom: "15px" }}
      />

      <button onClick={calculateScore}>Check ATS Score</button>

      {score !== null && (
        <div style={{ marginTop: "20px", background: "white", padding: "20px" }}>
          <h2>Your ATS Score: {score}%</h2>

          {score >= 75 ? (
            <p>Great match! Your resume fits this job well.</p>
          ) : score >= 50 ? (
            <p>Average match. Add more job-related keywords.</p>
          ) : (
            <p>Low match. Improve your resume with skills from the job description.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ATSScore;