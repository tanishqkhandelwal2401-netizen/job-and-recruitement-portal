import { useEffect, useState } from "react";
import API from "../api";

function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchDashboard();
    fetchJobs();
  }, []);

  const getToken = () => localStorage.getItem("token");

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/candidate/dashboard", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const applyJob = async (jobId) => {
    try {
      await API.post(
        `/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Apply failed");
    }
  };

  return (
    <div style={{ padding: "30px", background: "#F8FAFC", minHeight: "100vh" }}>
      <h1 style={{ color: "#0F172A" }}>Candidate Dashboard</h1>

      <div
        style={{
          background: "#FFFFFF",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "25px",
        }}
      >
        <h2>Welcome {user?.name || "Candidate"}</h2>
        <p>Email: {user?.email || "Loading..."}</p>
      </div>

      <h2>Available Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            style={{
              background: "#FFFFFF",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "15px",
              borderLeft: "5px solid #2563EB",
            }}
          >
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>
              <b>Company:</b> {job.company}
            </p>
            <p>
              <b>Location:</b> {job.location}
            </p>

            <button
              onClick={() => applyJob(job.id)}
              style={{
                background: "#2563EB",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Apply
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default CandidateDashboard;