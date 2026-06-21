import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { FaUserPlus } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/signup", form);

      alert("Account created successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="hero-panel">
        <p className="eyebrow">CREATE ACCOUNT</p>

        <h1>
          Start Your
          <br />
          Career Journey
        </h1>

        <p className="hero-text">
          Join thousands of candidates and recruiters using HireFlow to
          discover opportunities and hire top talent.
        </p>
      </div>

      <div className="login-card">
        <div className="brand-icon">
          <FaUserPlus />
        </div>

        <h2>Create Account</h2>
        <p>Register to access the recruitment portal</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid #E2E8F0",
              marginBottom: "15px",
            }}
          >
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button type="submit" className="login-btn">
            Create Account
          </button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;