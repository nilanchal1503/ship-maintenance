import React, { useState } from "react";
import styles from "./notification.module.css";

const PingPage = () => {
  const [notifications, setNotifications] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("notifications")) || [];
    } catch {
      return [];
    }
  });

  const dismissNotification = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Notifications</h2>

      {notifications.length === 0 ? (
        <p className={styles.empty}>No notifications.</p>
      ) : (
        notifications.map((notif) => (
          <div key={notif.id} className={styles.notificationCard}>
            <div className={styles.notifText}>
              <p className={styles.notifTitle}>{notif.type}</p>
              <p className={styles.notifMsg}>{notif.message}</p>
            </div>
            <button
              onClick={() => dismissNotification(notif.id)}
              className={styles.dismissBtn}
            >
              Dismiss
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PingPage;
