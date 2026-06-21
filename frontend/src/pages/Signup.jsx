import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/signup", form);

      alert("Account Created Successfully 🎉");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.detail || "Signup Failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        <div className="logo-section">
          <h1>Smart Recruitment Portal</h1>
          <p>Create your account and start your journey</p>
        </div>

        <form onSubmit={handleSignup}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="candidate">Candidate</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <button className="signup-btn">
            Create Account
          </button>

          <p className="login-link">
            Already have an account?
            <Link to="/"> Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Signup;