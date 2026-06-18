import { useState } from "react";
import API from "../api";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/signup", form);
      alert("Signup successful");
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button>Signup</button>
    </form>
  );
}

export default Signup;