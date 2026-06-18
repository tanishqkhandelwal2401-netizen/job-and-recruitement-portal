import { useState } from "react";
import API from "../api";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", form);

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      alert("Login successful");

      window.location.href = "/candidate-dashboard";
    } catch (err) {
      alert(
        err.response?.data?.detail ||
        "Login failed"
      );
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
          outline: "none",
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
          outline: "none",
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
          transition: "0.3s",
        }}
      >
        Login
      </button>
    </form>
  </div>
</div>
  );
}

export default Login;