import { useEffect, useState } from "react";
import API from "../api";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createJob = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      alert("Job posted successfully");
      setForm({ title: "", company: "", location: "", description: "" });
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.detail || "Job post failed");
    }
  };

  return (
    <div style={{ padding: "30px", background: "#F8FAFC", minHeight: "100vh" }}>
      <h1>Recruiter Dashboard</h1>

      <form
        onSubmit={createJob}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "25px",
        }}
      >
        <h2>Post New Job</h2>

        <input
          placeholder="Job Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <textarea
          placeholder="Job Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button type="submit">Post Job</button>
      </form>

      <h2>Posted Jobs</h2>

      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "15px",
          }}
        >
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p><b>Company:</b> {job.company}</p>
          <p><b>Location:</b> {job.location}</p>
        </div>
      ))}
    </div>
  );
}

export default RecruiterDashboard;