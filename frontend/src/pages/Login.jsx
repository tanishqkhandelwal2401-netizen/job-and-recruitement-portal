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

      alert("Login successful");

      if (res.data.role === "candidate") {
        navigate("/candidate-dashboard");
      } else if (res.data.role === "recruiter") {
        navigate("/recruiter-dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F8FAFC",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "40px",
          background: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#0F172A",
            marginBottom: "30px",
          }}
        >
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            style={{
              padding: "14px",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            style={{
              padding: "14px",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "14px",
              background: "#2563EB",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <p style={{ textAlign: "center" }}>
            New user?{" "}
            <a
              href="/signup"
              style={{
                color: "#2563EB",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Create Account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;