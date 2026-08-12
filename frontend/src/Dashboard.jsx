
import React from "react";
import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      title: "Total Customers",
      value: "1,248",
      change: "+12%",
      text: "this month",
      icon: "👥",
    },
    {
      title: "Total Employees",
      value: "86",
      change: "+5.2%",
      text: "this month",
      icon: "👨‍💼",
    },
    {
      title: "Monthly Revenue",
      value: "₹74.6L",
      change: "+8.5%",
      text: "this month",
      icon: "💰",
    },
    {
      title: "Pending Tasks",
      value: "24",
      change: "8",
      text: "due today",
      icon: "📋",
    },
  ];

  const activities = [
    {
      name: "A Kani Kumar",
      action: "Added a new customer",
      time: "10 minutes ago",
      icon: "👤",
    },
    {
      name: "K S Kavya Sharma",
      action: "Updated employee details",
      time: "35 minutes ago",
      icon: "✏️",
    },
    {
      name: "Rohit Singh",
      action: "Generated a business report",
      time: "1 hour ago",
      icon: "📊",
    },
    {
      name: "Sneha Menon",
      action: "Completed a pending task",
      time: "2 hours ago",
      icon: "✅",
    },
  ];

  return (
    <div className="dashboard-page">

  {/* Back Button */}
  <button
    className="dashboard-back-btn"
    onClick={() => window.location.href="/"}
  >
    ← Back
  </button>

  

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="dashboard-label">ERP • CRM MANAGEMENT SYSTEM</p>
          <h1>Business Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        <div className="dashboard-date">
          <span>📅</span>
          <div>
            <small>Today</small>
            <strong>{new Date().toLocaleDateString()}</strong>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>

            <div className="stat-top">
              <div className="stat-icon">
                {stat.icon}
              </div>

              <span className="stat-menu">•••</span>
            </div>

            <p className="stat-title">{stat.title}</p>

            <h2>{stat.value}</h2>

            <div className="stat-bottom">
              <span className="positive">
                ↑ {stat.change}
              </span>

              <span>{stat.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard */}
      <div className="dashboard-main-grid">

        {/* Revenue Chart */}
        <div className="dashboard-card revenue-card">

          <div className="card-heading">
            <div>
              <h2>Revenue Overview</h2>
              <p>Monthly revenue performance</p>
            </div>

            <select>
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="revenue-summary">
            <strong>₹74.6L</strong>
            <span>↑ 8.5% compared to last month</span>
          </div>

          <div className="chart">

            <div className="chart-y">
              <span>80L</span>
              <span>60L</span>
              <span>40L</span>
              <span>20L</span>
              <span>0</span>
            </div>

            <div className="chart-area">

              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>

              <div className="bars">

                <div className="bar-column">
                  <div className="bar bar-1"></div>
                  <span>Mar</span>
                </div>

                <div className="bar-column">
                  <div className="bar bar-2"></div>
                  <span>Apr</span>
                </div>

                <div className="bar-column">
                  <div className="bar bar-3"></div>
                  <span>May</span>
                </div>

                <div className="bar-column">
                  <div className="bar bar-4"></div>
                  <span>Jun</span>
                </div>

                <div className="bar-column">
                  <div className="bar bar-5"></div>
                  <span>Jul</span>
                </div>

                <div className="bar-column">
                  <div className="bar bar-6"></div>
                  <span>Aug</span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card quick-card">

          <div className="card-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Common business operations</p>
            </div>
          </div>

          <div className="quick-actions">

            <button>
              <span>👥</span>
              <div>
                <strong>Add Customer</strong>
                <small>Create a new customer</small>
              </div>
              <b>→</b>
            </button>

            <button>
              <span>👨‍💼</span>
              <div>
                <strong>Add Employee</strong>
                <small>Add employee details</small>
              </div>
              <b>→</b>
            </button>

            <button>
              <span>📊</span>
              <div>
                <strong>View Reports</strong>
                <small>Business analytics</small>
              </div>
              <b>→</b>
            </button>

            <button>
              <span>📋</span>
              <div>
                <strong>Manage Tasks</strong>
                <small>Check pending tasks</small>
              </div>
              <b>→</b>
            </button>

          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="dashboard-bottom-grid">

        {/* Recent Activity */}
        <div className="dashboard-card activity-card">

          <div className="card-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest actions in your business</p>
            </div>

            <button className="view-all">
              View All
            </button>
          </div>

          <div className="activity-list">

            {activities.map((activity, index) => (
              <div className="activity-item" key={index}>

                <div className="activity-icon">
                  {activity.icon}
                </div>

                <div className="activity-content">
                  <strong>{activity.name}</strong>
                  <span>{activity.action}</span>
                </div>

                <small>{activity.time}</small>

              </div>
            ))}

          </div>
        </div>

        {/* Business Summary */}
        <div className="dashboard-card summary-card">

          <div className="card-heading">
            <div>
              <h2>Business Summary</h2>
              <p>Current performance</p>
            </div>
          </div>

          <div className="summary-item">
            <div>
              <span>Customer Growth</span>
              <strong>82%</strong>
            </div>

            <div className="progress">
              <div className="progress-fill growth"></div>
            </div>
          </div>

          <div className="summary-item">
            <div>
              <span>Employee Productivity</span>
              <strong>76%</strong>
            </div>

            <div className="progress">
              <div className="progress-fill productivity"></div>
            </div>
          </div>

          <div className="summary-item">
            <div>
              <span>Task Completion</span>
              <strong>68%</strong>
            </div>

            <div className="progress">
              <div className="progress-fill tasks"></div>
            </div>
          </div>

          <div className="summary-item">
            <div>
              <span>Revenue Target</span>
              <strong>91%</strong>
            </div>

            <div className="progress">
              <div className="progress-fill revenue"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;