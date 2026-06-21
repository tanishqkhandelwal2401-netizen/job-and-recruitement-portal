import { useState } from "react";
import API from "../api";

function ATSScore() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);

  const checkScore = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/ats-score",
        { resume_text: resumeText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.detail || "ATS check failed");
    }
  };

  return (
    <div className="ats-page">
      <div className="ats-header">
        <p className="eyebrow">ATS SCORE CHECKER</p>
        <h1>Check resume compatibility</h1>
        <p>Paste your resume text and get your ATS score instantly.</p>
      </div>

      <div className="ats-layout">
        <form className="ats-form" onSubmit={checkScore}>
          <textarea
            placeholder="Paste your resume text here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            required
          />

          <button className="login-btn" type="submit">
            Check ATS Score
          </button>
        </form>

        <div className="ats-result">
          <h2>Your Result</h2>

          {result ? (
            <>
              <div className="score-circle">
                {result.score || result.ats_score || 0}%
              </div>

              <p>{result.message || "Resume analysed successfully."}</p>

              <ul>
                <li>Use relevant job keywords</li>
                <li>Add measurable achievements</li>
                <li>Keep formatting simple</li>
                <li>Include skills clearly</li>
              </ul>
            </>
          ) : (
            <p className="muted">Your ATS score will appear here...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ATSScore;