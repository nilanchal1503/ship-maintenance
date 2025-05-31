import React, { useState, useEffect } from "react";
import styles from './component.module.css';

const Compo = ({ components = [], setComponents }) => {
  const [formData, setFormData] = useState({
    shipId: '',
    componentName: '',
    serialNumber: '',
    manufactureDate: '',
    installationDate: '',
    status: 'Pending',
  });

  const [section, setSection] = useState("list");

  useEffect(() => {
    const storedComp = localStorage.getItem('components');
    if (storedComp) {
      setComponents(JSON.parse(storedComp));
    }
  }, [setComponents]);

  useEffect(() => {
    localStorage.setItem('components', JSON.stringify(components));
  }, [components]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddComponent = () => {
    const { shipId, componentName, serialNumber, manufactureDate, installationDate } = formData;
    if (!shipId || !componentName || !serialNumber || !manufactureDate || !installationDate) {
      alert('Please fill all fields');
      return;
    }

    const newComponent = { ...formData, status: "Overdue" };
    setComponents((prev) => [...prev, newComponent]);

    setFormData({
      shipId: '',
      componentName: '',
      serialNumber: '',
      manufactureDate: '',
      installationDate: '',
      status: 'Pending',
    });

    setSection("list");
  };

  const handleDelete = (index) => {
    setComponents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    const compToEdit = components[index];
    setFormData(compToEdit);
    handleDelete(index);
    setSection("edit");
  };

  const renderListCompSection = () => (
    <div>
      <h3 className={styles.listTitle}>List Components</h3>
      {(components || []).map((comp, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.cardText}>
            <p><strong>Ship ID:</strong> {comp.shipId}</p>
            <p><strong>Component Name:</strong> {comp.componentName}</p>
            <p><strong>Serial Number:</strong> {comp.serialNumber}</p>
            <p><strong>Manufacture Date:</strong> {comp.manufactureDate}</p>
            <p><strong>Installation Date:</strong> {comp.installationDate}</p>
            <p><strong>Status:</strong> {comp.status}</p>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.edit} onClick={() => handleEdit(index)}>Edit</button>
            <button className={styles.delete} onClick={() => handleDelete(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFormSection = () => (
    <div className={styles.formRow}>
      <input
        className={styles.input}
        name="shipId"
        type="text"
        placeholder="Ship ID"
        value={formData.shipId}
        onChange={handleChange}
      />
      <input
        className={styles.input}
        name="componentName"
        type="text"
        placeholder="Component Name"
        value={formData.componentName}
        onChange={handleChange}
      />
      <input
        className={styles.input}
        name="serialNumber"
        type="text"
        placeholder="Serial Number"
        value={formData.serialNumber}
        onChange={handleChange}
      />
      <input
        className={styles.input}
        name="manufactureDate"
        type="date"
        value={formData.manufactureDate}
        onChange={handleChange}
      />
      <input
        className={styles.input}
        name="installationDate"
        type="date"
        value={formData.installationDate}
        onChange={handleChange}
      />
      <button className={`${styles.button} ${styles.primary}`} onClick={handleAddComponent}>
        {section === "edit" ? "Save Component" : "Add Component"}
      </button>
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Component Management</h2>

      <div className={styles.btnRow}>
        <button className={styles.primaryBtn} onClick={() => setSection("form")}>
          Add/Edit Component
        </button>
        <button className={styles.primaryBtn} onClick={() => setSection("list")}>
          List Components
        </button>
      </div>

      {section === "form" || section === "edit" ? renderFormSection() : null}
      {section === "list" ? renderListCompSection() : null}
    </div>
  );
};

export default Compo;