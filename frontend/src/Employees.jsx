import React, { useEffect, useMemo, useState } from "react";
import "./Employees.css";

const API_URL = "http://localhost:5000/api/employees";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  department: "Development",
  role: "",
  status: "Active",
};

function Employees({ onBack }) {
  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================
  // LOAD EMPLOYEES FROM BACKEND
  // =========================
  const loadEmployees = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load employees");
      }

      const data = await response.json();

      // Supports:
      // [ ...employees ]
      // { employees: [...] }
      // { data: [...] }
      const employeeList = Array.isArray(data)
        ? data
        : Array.isArray(data.employees)
        ? data.employees
        : Array.isArray(data.data)
        ? data.data
        : [];

      setEmployees(employeeList);
    } catch (error) {
      console.error("Employee loading error:", error);

      alert(
        "Cannot connect to the employee backend.\n\nMake sure your backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load employees when page opens
  useEffect(() => {
    loadEmployees();
  }, []);

  // =========================
  // FILTER EMPLOYEES
  // =========================
  const filteredEmployees = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return employees.filter((employee) => {
      const name = String(employee.name || "").toLowerCase();
      const email = String(employee.email || "").toLowerCase();
      const role = String(employee.role || "").toLowerCase();
      const dept = String(employee.department || "").toLowerCase();

      const matchesSearch =
        name.includes(searchText) ||
        email.includes(searchText) ||
        role.includes(searchText) ||
        dept.includes(searchText);

      const matchesDepartment =
        department === "All" ||
        employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, search, department]);

  // =========================
  // STATISTICS
  // =========================
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const departmentCount = new Set(
    employees
      .map((employee) => employee.department)
      .filter(Boolean)
  ).size;

  // =========================
  // INPUT CHANGE
  // =========================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // ADD EMPLOYEE TO BACKEND
  // =========================
  const handleAddEmployee = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const role = formData.role.trim();

    if (!name || !email || !phone || !role) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          department: formData.department,
          role,
          status: formData.status,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          result?.message ||
          result?.error ||
          "Failed to add employee.";

        throw new Error(message);
      }

      // Reset form
      setFormData(emptyForm);
      setShowForm(false);

      // IMPORTANT:
      // Reload from database/backend
      // instead of only adding to React state.
      await loadEmployees();

      alert("Employee added successfully!");
    } catch (error) {
      console.error("Add employee error:", error);

      alert(
        `Failed to add employee.\n\n${error.message}`
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE EMPLOYEE
  // =========================
  const handleDelete = async (id) => {
    const employee = employees.find(
      (item) => item.id === id
    );

    if (!employee) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${employee.name}?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.error ||
            "Failed to delete employee."
        );
      }

      await loadEmployees();

      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Delete employee error:", error);

      alert(
        `Could not delete employee.\n\n${error.message}`
      );
    }
  };

  // =========================
  // TOGGLE STATUS
  // =========================
  const toggleStatus = async (employee) => {
    const newStatus =
      employee.status === "Active"
        ? "Inactive"
        : "Active";

    try {
      const response = await fetch(
        `${API_URL}/${employee.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...employee,
            status: newStatus,
          }),
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.error ||
            "Failed to update employee."
        );
      }

      await loadEmployees();
    } catch (error) {
      console.error("Status update error:", error);

      alert(
        `Could not update employee status.\n\n${error.message}`
      );
    }
  };

  // =========================
  // CLOSE FORM
  // =========================
  const closeForm = () => {
    setShowForm(false);
    setFormData(emptyForm);
  };

  return (
    <div className="employees-page">

      {/* BACK BUTTON */}
      <button
        type="button"
        className="employee-back-button"
        onClick={onBack}
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="employees-header">

        <div>
          <p className="employees-subtitle">
            ERP • CRM MANAGEMENT SYSTEM
          </p>

          <h1>
            👨‍💼 Employee Management
          </h1>

          <p className="employees-description">
            Manage and organize all your employee information.
          </p>
        </div>

        <button
          type="button"
          className="add-employee-button"
          onClick={() =>
            setShowForm((previous) => !previous)
          }
        >
          + Add Employee
        </button>

      </div>

      {/* STATISTICS */}
      <div className="employee-stats">

        <div className="employee-stat-card">
          <span className="stat-icon">👥</span>

          <div>
            <p>Total Employees</p>
            <h2>{totalEmployees}</h2>
          </div>
        </div>

        <div className="employee-stat-card">
          <span className="stat-icon active-icon">
            ✓
          </span>

          <div>
            <p>Active Employees</p>
            <h2>{activeEmployees}</h2>
          </div>
        </div>

        <div className="employee-stat-card">
          <span className="stat-icon inactive-icon">
            ●
          </span>

          <div>
            <p>Inactive Employees</p>
            <h2>{inactiveEmployees}</h2>
          </div>
        </div>

        <div className="employee-stat-card">
          <span className="stat-icon department-icon">
            🏢
          </span>

          <div>
            <p>Departments</p>
            <h2>{departmentCount}</h2>
          </div>
        </div>

      </div>

      {/* ADD EMPLOYEE FORM */}
      {showForm && (
        <div className="employee-form-card">

          <div className="form-heading">

            <div>
              <h2>Add New Employee</h2>

              <p>
                Enter employee details below.
              </p>
            </div>

            <button
              type="button"
              className="close-form-button"
              onClick={closeForm}
            >
              ✕
            </button>

          </div>

          <form onSubmit={handleAddEmployee}>

            <div className="employee-form-grid">

              {/* NAME */}
              <div className="form-group">
                <label>Full Name *</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter employee name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label>Email *</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* PHONE */}
              <div className="form-group">
                <label>Phone *</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              {/* DEPARTMENT */}
              <div className="form-group">
                <label>Department</label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="Development">
                    Development
                  </option>

                  <option value="Sales">
                    Sales
                  </option>

                  <option value="HR">
                    HR
                  </option>

                  <option value="Finance">
                    Finance
                  </option>

                  <option value="Marketing">
                    Marketing
                  </option>

                  <option value="Operations">
                    Operations
                  </option>
                </select>
              </div>

              {/* ROLE */}
              <div className="form-group">
                <label>Role *</label>

                <input
                  type="text"
                  name="role"
                  placeholder="Enter job role"
                  value={formData.role}
                  onChange={handleInputChange}
                />
              </div>

              {/* STATUS */}
              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>

            </div>

            {/* FORM BUTTONS */}
            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-employee-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "+ Add Employee"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* EMPLOYEE LIST */}
      <div className="employee-list-card">

        <div className="employee-list-header">

          <div>
            <h2>Employee List</h2>

            <p>
              View and manage your employees
            </p>
          </div>

          <div className="employee-filters">

            {/* SEARCH */}
            <div className="employee-search">

              <span>🔍</span>

              <input
                type="text"
                placeholder="Search employees..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            {/* DEPARTMENT */}
            <select
              className="department-filter"
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
            >
              <option value="All">All</option>

              <option value="Development">
                Development
              </option>

              <option value="Sales">
                Sales
              </option>

              <option value="HR">
                HR
              </option>

              <option value="Finance">
                Finance
              </option>

              <option value="Marketing">
                Marketing
              </option>

              <option value="Operations">
                Operations
              </option>

            </select>

          </div>

        </div>

        {/* TABLE */}
        <div className="employee-table-wrapper">

          <table className="employee-table">

            <thead>
              <tr>
                <th>Employee</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="no-employees"
                  >
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="no-employees"
                  >
                    No employees found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (

                  <tr key={employee.id}>

                    {/* EMPLOYEE */}
                    <td>
                      <div className="employee-name-cell">

                        <div className="employee-avatar">
                          {String(
                            employee.name || "?"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {employee.name}
                        </strong>

                      </div>
                    </td>

                    {/* EMAIL */}
                    <td>
                      {employee.email}
                    </td>

                    {/* PHONE */}
                    <td>
                      {employee.phone}
                    </td>

                    {/* DEPARTMENT */}
                    <td>
                      <span className="department-badge">
                        {employee.department}
                      </span>
                    </td>

                    {/* ROLE */}
                    <td>
                      {employee.role}
                    </td>

                    {/* STATUS */}
                    <td>
                      <button
                        type="button"
                        className={`status-badge ${
                          employee.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                        onClick={() =>
                          toggleStatus(employee)
                        }
                      >
                        ● {employee.status}
                      </button>
                    </td>

                    {/* DELETE */}
                    <td>
                      <button
                        type="button"
                        className="delete-employee-button"
                        onClick={() =>
                          handleDelete(employee.id)
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Employees;