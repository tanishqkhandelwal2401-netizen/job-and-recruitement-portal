```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

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
          width: "450px",
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
            marginBottom: "25px",
          }}
        >
          Create Account
        </h1>

        <form
          onSubmit={handleSignup}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={{
              padding: "14px",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={{
              padding: "14px",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            style={{
              padding: "14px",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
            }}
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            style={{
              padding: "14px",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
            }}
          >
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button
            type="submit"
            style={{
              padding: "14px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>

          <p style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <a
              href="/"
              style={{
                color: "#2563EB",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
```
