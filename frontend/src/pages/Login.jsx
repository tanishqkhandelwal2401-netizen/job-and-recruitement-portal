
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", form);

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful");

      if (res.data.role === "candidate") {
        navigate("/candidate-dashboard");
      } else if (res.data.role === "recruiter") {
        navigate("/recruiter-dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  const handleRecruiterClick = () => {
    navigate("/signup");
  };

  return (
    <div className="login-page">
      <div className="hero-section">
        <p className="tagline">SMART RECRUITMENT PORTAL</p>

        <h1>
          Hire faster.
          <br />
          Apply smarter.
        </h1>

        <p>
          A modern placement platform for candidates, recruiters,
          resumes, applications and ATS scoring.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Explore Jobs →
          </button>

          <button
            className="secondary-btn"
            onClick={handleRecruiterClick}
          >
            For Recruiters 👔
          </button>
        </div>
      </div>

      <div className="login-card">
        <h2>Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button type="submit">
            Login →
          </button>
        </form>

        <p>
          New here?{" "}
          <span
            style={{
              cursor: "pointer",
              color: "#6366f1",
              fontWeight: "600",
            }}
            onClick={() => navigate("/signup")}
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

