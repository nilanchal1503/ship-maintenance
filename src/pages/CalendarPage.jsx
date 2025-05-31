import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styles from "./calendar.module.css";

const Dates = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [jobsForDate, setJobsForDate] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  useEffect(() => {
    const formatted = selectedDate.toISOString().split("T")[0];
    const filtered = jobs.filter(job => job.date === formatted);
    setJobsForDate(filtered);
  }, [selectedDate, jobs]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split("T")[0];
      const jobCount = jobs?.filter(job => job.date === dateStr).length;
      return jobCount ? (
        <div className={styles.jobCount}>{jobCount} job(s)</div>
      ) : null;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📅 Job Calendar</h2>

      <div className={styles.calendarCard}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
        />
      </div>

      <div className={styles.jobsSection}>
        <h3 className={styles.subTitle}>Jobs on {selectedDate.toDateString()}</h3>
        {jobsForDate.length > 0 ? (
          jobsForDate.map((job, index) => (
            <div key={index} className={styles.jobCard}>
              <p><strong>Job Type:</strong> {job.type}</p>
              <p><strong>Ship:</strong> {job.ship}</p>
              <p><strong>Priority:</strong> {job.priority}</p>
              <p><strong>Status:</strong> {job.status}</p>
              <p><strong>Engineer:</strong> {job.engineer}</p>
            </div>
          ))
        ) : (
          <p className={styles.noJobs}>No jobs scheduled for this day.</p>
        )}
      </div>
    </div>
  );
};

export default Dates;
