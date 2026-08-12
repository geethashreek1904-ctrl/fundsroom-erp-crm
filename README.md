# Fundsroom ERP & CRM Management System

A web-based ERP and CRM management system designed to manage employees, customers, business operations, and reports through a centralized dashboard.

## 🚀 Project Overview

Fundsroom ERP & CRM is a full-stack web application developed to simplify and organize business management activities.

The system provides a centralized dashboard for managing:

- Employees
- Customers
- Business Operations
- Reports
- User Login
- Business information

The project follows a frontend-backend architecture using React.js on the frontend and Node.js/TypeScript on the backend.

---

## ✨ Features

### 📊 Dashboard

- Business management dashboard
- Employee statistics
- Customer statistics
- Active and inactive records
- Department information
- Quick access to management modules

### 👨‍💼 Employee Management

- View employees
- Add employees
- Search employees
- Filter employees
- Edit employee information
- Delete employee records
- Manage employee status

### 👥 Customer Management

- View customer list
- Add new customers
- Edit customer information
- Delete customers
- Search customers
- Manage Active/Inactive status
- Manage company information

### 💼 Business Operations

- Business operation management interface
- Centralized business information
- Operation-related dashboard components
- Business activity management

### 📈 Reports

- Reports management interface
- Business information presentation
- Organized reporting interface

### 🔐 Login

- User login interface
- Authentication interface for accessing the system

---

## 🛠️ Technology Stack

### Frontend

- React.js
- JavaScript / JSX
- CSS
- Vite

### Backend

- Node.js
- TypeScript
- REST API architecture

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

---

## 🏗️ System Architecture

```text
                 ┌──────────────────────┐
                 │       User           │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   React Frontend     │
                 │      + Vite          │
                 └──────────┬───────────┘
                            │
                       REST API
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Node.js Backend    │
                 │    TypeScript        │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Business Management  │
                 │      Services        │
                 └──────────────────────┘
```

---

## 📁 Project Structure

```text
fundsroom-erp-crm/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   └── server.ts
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Employees.jsx
│   │   ├── Customers.jsx
│   │   ├── BusinessOperations.jsx
│   │   ├── Reports.jsx
│   │   ├── Login.jsx
│   │   ├── main.jsx
│   │   └── CSS files
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ▶️ How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/geethashreek1904-ctrl/fundsroom-erp-crm.git
```

### 2. Open the project

```bash
cd fundsroom-erp-crm
```

### 3. Run the Frontend

Open a terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run using the Vite development server.

### 4. Run the Backend

Open another terminal:

```bash
cd backend
npm install
npm run dev
```

The backend runs as a Node.js/TypeScript service.

---

## 📸 Screenshots

### Login

![Login Page](login.png)

### Dashboard

_Add dashboard screenshot here._

### Employee Management

_Add employee management screenshot here._

### Customer Management

_Add customer management screenshot here._

### Business Operations

_Add business operations screenshot here._

### Reports

_Add reports screenshot here._

---

## 🚧 Current Project Status

### Completed

- Frontend project setup
- Login interface
- Dashboard interface
- Employee Management interface
- Customer Management interface
- Business Operations interface
- Reports interface
- Search functionality
- Filtering functionality
- Add/Edit/Delete interfaces
- Active/Inactive status management
- Backend project structure
- GitHub repository setup
- Project documentation

### In Progress

- Complete frontend-backend API integration
- Persistent database integration
- Production deployment
- Further backend functionality

---

## 🔗 Repository

GitHub Repository:

https://github.com/geethashreek1904-ctrl/fundsroom-erp-crm

---

## 👩‍💻 Project

**Fundsroom ERP & CRM Management System**

Developed as a business management application for handling employee, customer, operational, and reporting activities through a centralized web interface.
