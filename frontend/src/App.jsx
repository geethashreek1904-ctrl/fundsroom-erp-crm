import { useState } from "react";
import "./App.css";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Customers from "./Customers";
import Employees from "./Employees";
import Reports from "./Reports";
import BusinessOperations from "./BusinessOperations";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // =========================
  // CUSTOMERS PAGE
  // =========================
  if (currentPage === "customers") {
    return (
      <div className="page-wrapper">
        <Customers
          onBack={() => setCurrentPage("home")}
        />
      </div>
    );
  }

  // =========================
  // EMPLOYEES PAGE
  // =========================
  if (currentPage === "employees") {
    return (
      <div className="page-wrapper">
        <Employees
          onBack={() => setCurrentPage("home")}
        />
      </div>
    );
  }

  // =========================
  // REPORTS PAGE
  // =========================
  if (currentPage === "reports") {
    return (
      <div className="page-wrapper">
        <Reports
          onBack={() => setCurrentPage("home")}
        />
      </div>
    );
  }

  // =========================
  // DASHBOARD PAGE
  // =========================
  if (currentPage === "dashboard") {
    return (
      <div className="page-wrapper">
        <Dashboard
          onBack={() => setCurrentPage("home")}
        />
      </div>
    );
  }

  // =========================
  // BUSINESS OPERATIONS PAGE
  // =========================
  if (currentPage === "operations") {
    return (
      <div className="page-wrapper">
        <BusinessOperations
          onBack={() => setCurrentPage("home")}
        />
      </div>
    );
  }

  // =========================
  // LOGIN PAGE
  // =========================
  if (currentPage === "login") {
    return (
      <div className="page-wrapper">
        <Login
          onBack={() => setCurrentPage("home")}
          onLogin={() => setCurrentPage("dashboard")}
        />
      </div>
    );
  }

  // =========================
  // HOME PAGE
  // =========================
  return (
    <div className="app">

      {/* NAVIGATION */}
      <nav className="navbar">

        <div className="logo">
          Fundsroom <span>ERP-CRM</span>
        </div>

        <div className="nav-links">

          <button
            type="button"
            onClick={() => setCurrentPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage("customers")}
          >
            Customers
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage("employees")}
          >
            Employees
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage("reports")}
          >
            Reports
          </button>

          <button
            type="button"
            className="login-btn"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-content">

          <p className="subtitle">
            ERP • CRM MANAGEMENT SYSTEM
          </p>

          <h1>
            Manage Your
            <br />
            Business
            <br />
            <span>Smarter & Faster</span>
          </h1>

          <p className="description">
            A centralized platform to manage customers,
            employees, business operations and reports in one place.
          </p>

          <div className="hero-buttons">

            <button
              type="button"
              className="primary-btn"
              onClick={() => setCurrentPage("dashboard")}
            >
              Get Started
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={() => setCurrentPage("dashboard")}
            >
              View Dashboard
            </button>

          </div>

        </div>

        {/* BUSINESS OVERVIEW */}
        <div className="overview-card">

          <div className="overview-header">
            <h2>Business Overview</h2>
            <span>Today</span>
          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <p>Total Customers</p>
              <h3>1,248</h3>
              <span>+12% this month</span>
            </div>

            <div className="stat-card">
              <p>Employees</p>
              <h3>86</h3>
              <span>+4 new employees</span>
            </div>

            <div className="stat-card">
              <p>Revenue</p>
              <h3>₹4.8L</h3>
              <span>+8.5% this month</span>
            </div>

            <div className="stat-card">
              <p>Pending Tasks</p>
              <h3>24</h3>
              <span>8 due today</span>
            </div>

          </div>
        </div>

      </section>

      {/* EVERYTHING YOU NEED */}
      <section className="features">

        <h2>Everything You Need</h2>

        <div className="feature-grid">

          {/* CUSTOMER MANAGEMENT */}
          <div
            className="feature-card clickable"
            onClick={() => setCurrentPage("customers")}
          >

            <div className="feature-icon">
              👥
            </div>

            <h3>
              Customer Management
            </h3>

            <p>
              Store and manage customer information efficiently.
            </p>

            <button
              type="button"
              className="feature-btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPage("customers");
              }}
            >
              Manage Customers →
            </button>

          </div>

          {/* EMPLOYEE MANAGEMENT */}
          <div
            className="feature-card clickable"
            onClick={() => setCurrentPage("employees")}
          >

            <div className="feature-icon">
              💼
            </div>

            <h3>
              Employee Management
            </h3>

            <p>
              Manage employee records, roles and daily activities.
            </p>

            <button
              type="button"
              className="feature-btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPage("employees");
              }}
            >
              Manage Employees →
            </button>

          </div>

          {/* REPORTS & ANALYTICS */}
          <div
            className="feature-card clickable"
            onClick={() => setCurrentPage("reports")}
          >

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Reports & Analytics
            </h3>

            <p>
              Get useful insights through business reports.
            </p>

            <button
              type="button"
              className="feature-btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPage("reports");
              }}
            >
              View Reports →
            </button>

          </div>

          {/* BUSINESS OPERATIONS */}
          <div
            className="feature-card clickable"
            onClick={() => setCurrentPage("operations")}
          >

            <div className="feature-icon">
              ⚙️
            </div>

            <h3>
              Business Operations
            </h3>

            <p>
              Keep your business processes organized in one system.
            </p>

            <button
              type="button"
              className="feature-btn"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPage("operations");
              }}
            >
              Manage Operations →
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default App;