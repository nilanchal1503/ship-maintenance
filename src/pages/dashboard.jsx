import React, { useEffect, useState } from "react";
import styles from "./styles/dashboard.module.css";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [ships, setShips] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const storedShips = JSON.parse(localStorage.getItem("ships")) || [];
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const storedComponents = JSON.parse(localStorage.getItem("components")) || [];

    setShips(storedShips);
    setJobs(storedJobs);
    setComponents(storedComponents);
  }, []);

  const totalShips = ships.length;
  const overdueComponents = components.filter(comp => comp.status === "Overdue").length;
  const jobsInProgress = jobs.filter(job => job.status === "In Progress").length;
  const jobsCompleted = jobs.filter(job => job.status === "Completed").length;

  const barChartData = {
    labels: ["Total Ships", "Overdue Components", "In Progress", "Completed"],
    datasets: [
      {
        label: "Counts",
        data: [totalShips, overdueComponents, jobsInProgress, jobsCompleted],
        backgroundColor: ["#3b82f6", "#ef4444", "#f59e0b", "#10b981"],
        borderRadius: 8,
      },
    ],
  };

  const pieChartData = {
    labels: ["In Progress", "Completed"],
    datasets: [
      {
        data: [jobsInProgress, jobsCompleted],
        backgroundColor: ["#f59e0b", "#10b981"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.title}>Ship Management Dashboard</h2>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h3>Total Ships</h3>
          <p>{totalShips}</p>
        </div>
        <div className={styles.card}>
          <h3>Overdue Components</h3>
          <p>{overdueComponents}</p>
        </div>
        <div className={styles.card}>
          <h3>Jobs In Progress</h3>
          <p>{jobsInProgress}</p>
        </div>
        <div className={styles.card}>
          <h3>Jobs Completed</h3>
          <p>{jobsCompleted}</p>
        </div>
      </div>

      <div className={styles.charts}>
        <div className={styles.chartCard}>
          <h4>Overview Bar Chart</h4>
          <Bar data={barChartData} />
        </div>
        <div className={styles.chartCard}>
          <h4>Job Status Distribution</h4>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
