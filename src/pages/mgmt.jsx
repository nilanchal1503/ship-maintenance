import React, { useState, useEffect } from "react";
import style from "./management.module.css";
import ComponentsPage from "./ComponentsPage";
import CalendarPage from "./CalendarPage";
import NotificationsPage from "./NotificationsPage";
import Dashboard from "./dashboard";
import Work from "./JobsPage"; // Correct import

const initialData = {
  ships: [
    { id: 1, name: "Evergreen", imo: "1234567", flag: "Panama", status: "Active", info: "N/A", maintenance: "None", components: "Engine" },
    { id: 2, name: "OceanX", imo: "7654321", flag: "Liberia", status: "Docked", info: "N/A", maintenance: "Due", components: "Radar" },
  ],
  components: [],
};

const Management = () => {
  const [navSection, setNavSection] = useState("ships");
  const [section, setSection] = useState("list");

  const [ships, setShips] = useState([]);
  const [components, setComponents] = useState([]);
  const [form, setForm] = useState({ name: "", imo: "", flag: "", status: "", info: "", maintenance: "", components: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedShips = localStorage.getItem("ships");
    setShips(storedShips ? JSON.parse(storedShips) : initialData.ships);
  }, []);

  useEffect(() => {
    localStorage.setItem("ships", JSON.stringify(ships));
  }, [ships]);

  useEffect(() => {
    const storedComponents = localStorage.getItem("components");
    setComponents(storedComponents ? JSON.parse(storedComponents) : initialData.components);
  }, []);

  useEffect(() => {
    localStorage.setItem("components", JSON.stringify(components));
  }, [components]);

  const addShip = () => {
    const newShip = { ...form, id: Date.now() };
    setShips([...ships, newShip]);
    setForm({ name: "", imo: "", flag: "", status: "", info: "", maintenance: "", components: "" });
  };

  const deleteShip = (id) => {
    setShips(ships.filter((ship) => ship.id !== id));
  };

  const startEdit = (ship) => {
    setEditId(ship.id);
    setForm({ ...ship });
  };

  const saveEdit = () => {
    setShips(ships.map((ship) => (ship.id === editId ? { ...ship, ...form } : ship)));
    setEditId(null);
    setForm({ name: "", imo: "", flag: "", status: "", info: "", maintenance: "", components: "" });
  };

  const renderListSection = () => (
    <div>
      <h2 className={style.sectionTitle}>List Ships</h2>
      {ships.map((ship) => (
        <div key={ship.id} className={style.shipCard}>
          <div>
            <p><strong>Name:</strong> {ship.name}</p>
            <p><strong>IMO:</strong> {ship.imo}</p>
            <p><strong>Flag:</strong> {ship.flag}</p>
            <p><strong>Status:</strong> {ship.status}</p>
            <p><strong>Info:</strong> {ship.info}</p>
            <p><strong>Maintenance:</strong> {ship.maintenance}</p>
            <p><strong>Components:</strong> {ship.components}</p>
          </div>
          <div className={style.buttonGroup}>
            <button onClick={() => startEdit(ship)} className={style.editBtn}>Edit</button>
            <button onClick={() => deleteShip(ship.id)} className={style.deleteBtn}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEditSection = () => (
    <div>
      <h2 className={style.sectionTitle}>{editId ? "Edit Ship" : "Create Ship"}</h2>
      {["name", "imo", "flag", "status", "info", "maintenance", "components"].map((field) => (
        <input
          key={field}
          className={style.input}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        />
      ))}
      <button className={style.primaryBtn} onClick={editId ? saveEdit : addShip}>
        {editId ? "Save" : "Add"}
      </button>
    </div>
  );

  return (
    <div className={style.container}>
      <div className={style.navBar}>
        {["ships", "components", "jobs", "calendar", "notifications", "dashboard"].map((item) => (
          <button
            key={item}
            onClick={() => setNavSection(item)}
            className={style.navButton}
          >
            {item}
          </button>
        ))}
      </div>

      {navSection === "ships" && (
        <div>
          <div className={style.btnRow}>
            <button className={style.primaryBtn} onClick={() => setSection("list")}>List Ships</button>
            <button className={style.primaryBtn} onClick={() => setSection("edit")}>Edit Info</button>
          </div>
          {section === "list" && renderListSection()}
          {section === "edit" && renderEditSection()}
        </div>
      )}

      {navSection === "components" && (
        <ComponentsPage components={components} setComponents={setComponents} />
      )}
      {navSection === "jobs" && (
        <Work />
      )}
      {navSection === "calendar" && <CalendarPage />}
      {navSection === "notifications" && <NotificationsPage />}
      {navSection === "dashboard" && (
        <Dashboard ships={ships} components={components} />
      )}
    </div>
  );
};

export default Management;
