# Placement Tracker System

A modern **Placement Management Application** built as a college project.
This system helps colleges track **student placements, company details, job roles, salary packages, and placement status** using the MERN stack.

---

## Tech Stack

* **Frontend:** React.js, Tailwind CSS, DaisyUI
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Notifications:** React Hot Toast
* **Icons:** Lucide React
* **API Client:** Axios

---

# Project Structure

```plaintext
PLACEMENT-TRACKER/
│
├── backend/                 # Express + MongoDB API (Port: 3000)
│   ├── src/
│   │   ├── config/          # Database connection (db.js)
│   │   ├── controllers/     # Business Logic (placementController.js)
│   │   ├── models/          # Mongoose Schema (placementModel.js)
│   │   └── routes/          # API Endpoints (placementRoutes.js)
│   │
│   ├── server.js            # Express server entry point
│   └── .env                 # Environment variables
│
└── frontend/                # Vite + React + Tailwind + DaisyUI
    ├── src/
    │   ├── components/      # Navbar, PlacementCard, PlacementNotFound
    │   ├── lib/             # Axios Instance (BaseURL: Port 3000)
    │   ├── pages/           # HomePage, AddPlacement, EditPlacement
    │   └── App.jsx          # Routing & App structure
```

---

# Key Features

### Placement Management (CRUD)

The system provides full **Placement Lifecycle Management**.

* **Add Placement:** Add new student placement records
* **View Placements:** Display all placements in a clean dashboard
* **Update Placement:** Edit company details, role, package, or status
* **Delete Placement:** Remove placement records with confirmation

---

### Placement Status Tracking

Each placement record includes a **status field** to track progress.

Available status options:

* Interview
* Placed
* Rejected
* Pending

This helps administrators monitor the placement pipeline effectively.

---

### Clean Dashboard UI

The application provides a **modern and responsive dashboard** built with Tailwind CSS and DaisyUI.

Features include:

* Responsive layout
* Professional navbar
* Placement cards
* Action icons (Edit / Delete)

---

### Action Icons

Instead of buttons, the system uses **Lucide React icons** for cleaner UI.

* ✏ Edit placement
* 🗑 Delete placement

---

### Delete Confirmation Modal

Before deleting any placement record, the system shows a **confirmation modal in the center of the screen** to prevent accidental deletions.

---

### Real-time Notifications

Integrated **React Hot Toast** to provide instant user feedback.

* Success messages
* Error alerts
* Update confirmations

---

# API Endpoints

Base URL:

```
http://localhost:3000/placements
```

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | /add        | Add new placement   |
| GET    | /           | Get all placements  |
| GET    | /:id        | Get placement by ID |
| PUT    | /update/:id | Update placement    |
| DELETE | /delete/:id | Delete placement    |

---

# Quick Start

## Setup Backend

```bash
cd backend
npm install
```

Create `.env` file and add:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Start backend server:

```bash
npm run dev
```

Backend will run at:

```
http://localhost:3000
```

---

## Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# Future Improvements

Possible enhancements for the system:

* Placement analytics dashboard
* Charts and statistics
* Search placements by student name
* Filter placements by status
* Admin authentication system

---

# Author

**Suraj Gupta**
Computer Science Student
