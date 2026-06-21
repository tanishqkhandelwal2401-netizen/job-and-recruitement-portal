import { useNavigate } from "react-router-dom";

function CandidateDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>
      <aside
        style={{
          width: "250px",
          background: "#0F172A",
          color: "#fff",
          padding: "25px",
        }}
      >
        <h2 style={{ marginBottom: "40px" }}>Candidate Panel</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <button style={navBtn}>Dashboard</button>
          <button style={navBtn} onClick={() => navigate("/jobs")}>Jobs</button>
          <button style={navBtn} onClick={() => navigate("/resume-builder")}>Resume Builder</button>
          <button style={navBtn} onClick={() => navigate("/ats-score")}>ATS Score</button>
          <button style={logoutBtn} onClick={logout}>Logout</button>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "30px" }}>
        <header
          style={{
            background: "#FFFFFF",
            padding: "25px",
            borderRadius: "16px",
            marginBottom: "30px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h1 style={{ color: "#0F172A" }}>Welcome Candidate 👋</h1>
          <p style={{ color: "#64748B" }}>
            Track jobs, applications, resume and ATS score from here.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div style={card}>
            <h3>Total Jobs</h3>
            <h1>15</h1>
          </div>

          <div style={card}>
            <h3>Applications</h3>
            <h1>3</h1>
          </div>

          <div style={card}>
            <h3>ATS Score</h3>
            <h1>82%</h1>
          </div>
        </section>

        <section
          style={{
            background: "#FFFFFF",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ color: "#0F172A", marginBottom: "20px" }}>
            Quick Actions
          </h2>

          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <button style={primaryBtn} onClick={() => navigate("/jobs")}>
              Browse Jobs
            </button>

            <button style={primaryBtn} onClick={() => navigate("/resume-builder")}>
              Build Resume
            </button>

            <button style={primaryBtn} onClick={() => navigate("/ats-score")}>
              Check ATS Score
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

const navBtn = {
  background: "transparent",
  color: "#CBD5E1",
  border: "none",
  textAlign: "left",
  fontSize: "16px",
  cursor: "pointer",
};

const logoutBtn = {
  marginTop: "30px",
  background: "#EF4444",
  color: "#fff",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const card = {
  background: "#FFFFFF",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  color: "#0F172A",
};

const primaryBtn = {
  background: "#2563EB",
  color: "#FFFFFF",
  border: "none",
  padding: "14px 20px",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
};

export default CandidateDashboard;