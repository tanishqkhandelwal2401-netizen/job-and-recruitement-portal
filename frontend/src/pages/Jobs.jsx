import { useEffect, useState } from "react";
import API from "../api";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Jobs</h1>

      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default Jobs;