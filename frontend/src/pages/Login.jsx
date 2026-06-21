import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { FaArrowRight, FaBriefcase, FaUserTie } from "react-icons/fa";

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
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);

      if (res.data.role === "candidate") {
        navigate("/candidate-dashboard");
      } else {
        navigate("/recruiter-dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="hero-panel">
        <p className="eyebrow">SMART RECRUITMENT PORTAL</p>

        <h1>
          Hire faster.
          <br />
          Apply smarter.
        </h1>

        <p className="hero-text">
          A modern placement platform for candidates, recruiters, resumes,
          applications and ATS scoring.
        </p>

        <div className="hero-actions">
          <button className="primary-btn">
            Explore Jobs <FaArrowRight />
          </button>

          <button className="outline-btn">
            For Recruiters <FaUserTie />
          </button>
        </div>

        <div className="hero-stats">
          <div>
            <h3>500+</h3>
            <p>Job Matches</p>
          </div>
          <div>
            <h3>98%</h3>
            <p>ATS Ready</p>
          </div>
          <div>
            <h3>24/7</h3>
            <p>Portal Access</p>
          </div>
        </div>
      </div>

      <div className="login-card">
        <div className="brand-icon">
          <FaBriefcase />
        </div>

        <h2>Welcome Back</h2>
        <p>Login to continue your career journey</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit" className="login-btn">
            Login <FaArrowRight />
          </button>
        </form>

        <p className="switch-text">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;