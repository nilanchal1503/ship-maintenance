
# 🚢 Ship Maintenance Management System

Welcome to the **Ship Maintenance Dashboard** – a React-based frontend application designed to manage and monitor ships, their components, maintenance schedules, and job progress in a clean and intuitive interface.

## 🌐 Live Demo

👉 [View Deployed App](https://ship-maintenance.vercel.app)  
👉 [GitHub Repository](https://github.com/nilanchal1503/ship-maintenance)

---

## 📁 Project Structure

/ship-maintenance

├── /public
├── /src
│ ├── /components
│ ├── /pages
│ ├── App.jsx
│ ├── Management.jsx
│ ├── dashboard.jsx
│ └── ...
├── package.json
└── README.md


---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js and npm installed
- Git installed

### Steps

# 1. Clone the repo
git clone https://github.com/nilanchal1503/ship-maintenance.git

# 2. Navigate into the project
cd ship-maintenance

# 3. Install dependencies
npm install

# 4. Start the local development server
npm start
The app will run on: http://localhost:3000




Application Architecture Overview
The application is structured around a single-page interface with modular navigation:

Login Page: User selects role (Admin/Inspector/Engineer) → navigates to dashboard.

Dashboard: Displays total ships, pending jobs, maintenance status using cards and charts.

Ships Page: Create, read, update, and delete ship records.

Components Page: Add and manage ship components.

Jobs Page: Track jobs in progress and completed tasks.

Calendar Page: View maintenance schedules by date.

Notifications Page: Placeholder for future alert system.

The Management.jsx file manages global state using useState and localStorage.

📦 State Management
State is managed using React's built-in useState and useEffect.

Ship and component data are persisted using localStorage.

Conditional rendering handles the current active view (ships, components, jobs, etc.)

🔐 Role-based Interface
Upon login:

If the user selects Admin, "Admin" appears in the navigation bar.

If Inspector is selected, "Inspector" shows.

If Engineer is selected, "Engineer" shows.

This changes dynamically without needing a backend (currently simulated).

🛠️ Technical Decisions
React.js: Chosen for its component-based architecture and easy state handling.

React Router: Used for page navigation.

LocalStorage: Used for data persistence without a backend.

Modular CSS: Styled using CSS Modules for scoped styling and maintainability.

Charts & Cards: Used to enhance dashboard readability (Recharts or similar, if integrated).

🐞 Known Issues / Limitations
No backend/database — data is lost on clearing browser storage.

Authentication is simulated (no real login validation).

Notifications and job scheduling are placeholders (not functional yet).

No role-based access control (all users can see everything for now).

🚧 Future Improvements
Integrate backend with Firebase or Node + MongoDB.

Implement real user authentication and secure login.

Add notifications/reminders for upcoming maintenance.

Filter/search across all ships and components.

Drag-and-drop scheduling with calendar.

Real-time updates using WebSockets.

👨‍💻 Author
Nilanchal
Frontend Developer | Student at NSUT
GitHub: nilanchal1503

📄 License
This project is licensed under the MIT License.



This Ship Maintenance Management System is a fully functional frontend application built using React that allows users to manage a fleet of ships, monitor maintenance activities, and track ongoing jobs. The system starts with a login page where users select their role—Admin, Inspector, or Engineer. Based on the role selected, the navigation bar dynamically displays the user's identity to tailor the interface. Once logged in, users land on a dashboard that gives an overview of total ships, overdue maintenance tasks, and job statuses using visual cards and charts.

The core of the application revolves around managing ships and their related data. Users can view a list of all ships, add new ones, edit existing entries, or delete them. Each ship entry includes important details such as IMO number, flag, maintenance status, and associated components. Similarly, the Components page allows the user to manage ship components like engines, radars, etc., with add/edit/delete functionalities.

The Jobs page tracks maintenance or repair tasks, showing which jobs are currently in progress and which are completed. There's also a Calendar page where all maintenance jobs are plotted by date, providing a clear visual schedule. Although notifications are not functional yet, the page is in place for future enhancements.

All data is managed using React’s state management (useState) and persisted in the browser’s localStorage, so even after a page refresh, the information remains intact. This project demonstrates how a modular, role-aware maintenance management system can be built purely on the frontend, with a responsive UI and smooth navigation experience.
