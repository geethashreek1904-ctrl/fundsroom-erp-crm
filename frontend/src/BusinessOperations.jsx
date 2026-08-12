import React, { useState } from "react";
import "./BusinessOperations.css";

function BusinessOperations({ onBack }) {
  const [operations, setOperations] = useState([
    {
      id: 1,
      title: "Review Customer Requests",
      category: "Customer Service",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      title: "Employee Performance Review",
      category: "HR",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Monthly Financial Review",
      category: "Finance",
      priority: "High",
      status: "Pending",
    },
    {
      id: 4,
      title: "Update Business Records",
      category: "Operations",
      priority: "Low",
      status: "Completed",
    },
  ]);

  const toggleStatus = (id) => {
    setOperations(
      operations.map((operation) =>
        operation.id === id
          ? {
              ...operation,
              status:
                operation.status === "Completed"
                  ? "Pending"
                  : "Completed",
            }
          : operation
      )
    );
  };

  const deleteOperation = (id) => {
    setOperations(
      operations.filter((operation) => operation.id !== id)
    );
  };

  const pending = operations.filter(
    (operation) => operation.status === "Pending"
  ).length;

  const inProgress = operations.filter(
    (operation) => operation.status === "In Progress"
  ).length;

  const completed = operations.filter(
    (operation) => operation.status === "Completed"
  ).length;

  return (
    <div className="business-operations-page">

      <button
        className="operations-back-button"
        onClick={onBack}
      >
        ← Back
      </button>

      <div className="operations-header">

        <div>
          <p className="operations-subtitle">
            ERP • CRM MANAGEMENT SYSTEM
          </p>

          <h1>⚙️ Business Operations</h1>

          <p className="operations-description">
            Organize and manage your daily business operations.
          </p>
        </div>

      </div>

      {/* Statistics */}
      <div className="operations-stats">

        <div className="operation-stat-card">
          <span>📋</span>
          <div>
            <p>Total Operations</p>
            <h2>{operations.length}</h2>
          </div>
        </div>

        <div className="operation-stat-card">
          <span>⏳</span>
          <div>
            <p>Pending</p>
            <h2>{pending}</h2>
          </div>
        </div>

        <div className="operation-stat-card">
          <span>🔄</span>
          <div>
            <p>In Progress</p>
            <h2>{inProgress}</h2>
          </div>
        </div>

        <div className="operation-stat-card">
          <span>✅</span>
          <div>
            <p>Completed</p>
            <h2>{completed}</h2>
          </div>
        </div>

      </div>

      {/* Operations List */}
      <div className="operations-list-card">

        <div className="operations-list-header">
          <div>
            <h2>Business Operations</h2>
            <p>Manage your daily business activities</p>
          </div>
        </div>

        <div className="operations-table-wrapper">

          <table className="operations-table">

            <thead>
              <tr>
                <th>Operation</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {operations.map((operation) => (

                <tr key={operation.id}>

                  <td>
                    <strong>{operation.title}</strong>
                  </td>

                  <td>
                    {operation.category}
                  </td>

                  <td>
                    <span
                      className={`priority-${operation.priority.toLowerCase()}`}
                    >
                      {operation.priority}
                    </span>
                  </td>

                  <td>
                    <button
                      className={`operation-status ${
                        operation.status === "Completed"
                          ? "completed"
                          : operation.status === "In Progress"
                          ? "progress"
                          : "pending"
                      }`}
                      onClick={() => toggleStatus(operation.id)}
                    >
                      ● {operation.status}
                    </button>
                  </td>

                  <td>
                    <button
                      className="delete-operation-button"
                      onClick={() =>
                        deleteOperation(operation.id)
                      }
                    >
                      Delete
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default BusinessOperations;