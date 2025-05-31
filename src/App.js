import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import Management from './pages/mgmt';
import Dashboard from './pages/dashboard';
import Work from './pages/JobsPage';
import Dates from './pages/CalendarPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Management />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Work />} />
        <Route path="/calendar" element={<Dates />} />

      </Routes>
    </Router>
  );
}

export default App;
