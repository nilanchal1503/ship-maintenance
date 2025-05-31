import React, { useState, useEffect } from "react";
import styles from "./jobs.module.css";

const safeParse = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const Work = () => {
  const [jobs, setJobs] = useState(() => safeParse("jobs")); // load from localStorage on init
  const [notifications, setNotifications] = useState(() => safeParse("notifications"));
  const [filter, setFilter] = useState({ ship: "", status: "", priority: "" });
  const [form, setForm] = useState({
    ship: "",
    type: "",
    priority: "",
    status: "",
    engineer: "",
    date: "",
  });
  const [editId, setEditId] = useState(null);

  // Save to localStorage whenever jobs or notifications change
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (type, message) => {
    const newNotif = {
      id: Date.now(),
      type,
      message,
      time: new Date().toLocaleString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleSubmit = () => {
    if (!form.date) {
      alert("Please select a date.");
      return;
    }

    if (editId) {
      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          if (job.id === editId) {
            const updatedJob = { ...job, ...form };
            if (job.status !== "Completed" && updatedJob.status === "Completed") {
              addNotification("Job Completed", `Job for ${updatedJob.ship} (${updatedJob.type}) completed.`);
            } else {
              addNotification("Job Updated", `Job for ${updatedJob.ship} (${updatedJob.type}) updated.`);
            }
            return updatedJob;
          }
          return job;
        })
      );
      setEditId(null);
    } else {
      const newJob = { ...form, id: Date.now() };
      setJobs((prev) => [...prev, newJob]);
      addNotification("Job Created", `Job for ${newJob.ship} (${newJob.type}) created.`);
    }

    setForm({ ship: "", type: "", priority: "", status: "", engineer: "", date: "" });
  };

  const startEdit = (job) => {
    setEditId(job.id);
    setForm(job);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filter.ship === "" || job.ship === filter.ship) &&
      (filter.status === "" || job.status === filter.status) &&
      (filter.priority === "" || job.priority === filter.priority)
    );
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Maintenance Jobs</h2>

      <div className={styles.formGrid}>
        {["ship", "type", "priority", "status", "engineer", "date"].map((field) => {
          if (field === "status") {
            return (
              <select
                key={field}
                className={styles.input}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              >
                <option value="">Select Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            );
          } else if (field === "date") {
            return (
              <input
                key={field}
                type="date"
                className={styles.input}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            );
          }
          return (
            <input
              key={field}
              className={styles.input}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          );
        })}

        <button onClick={handleSubmit} className={styles.primaryButton}>
          {editId ? "Update Job" : "Create Job"}
        </button>
      </div>

      <div className={styles.filters}>
        <h3 className={styles.subTitle}>Filter Jobs</h3>
        <div className={styles.filterRow}>
          {["ship", "status", "priority"].map((field) => (
            <input
              key={field}
              className={styles.filterInput}
              placeholder={`Filter by ${field}`}
              value={filter[field]}
              onChange={(e) => setFilter({ ...filter, [field]: e.target.value })}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className={styles.subTitle}>Job List</h3>
        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <div>
                <p><strong>Ship:</strong> {job.ship}</p>
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Priority:</strong> {job.priority}</p>
                <p><strong>Status:</strong> {job.status}</p>
                <p><strong>Engineer:</strong> {job.engineer}</p>
                <p><strong>Date:</strong> {job.date}</p>
              </div>
              <div className={styles.buttonGroup}>
                <button onClick={() => startEdit(job)} className={styles.editBtn}>Edit</button>
                <button onClick={() => deleteJob(job.id)} className={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Work;
