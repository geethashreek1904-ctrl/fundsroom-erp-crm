import React, { useEffect, useState } from "react";
import "./Customers.css";

const API_URL = "http://localhost:5000/api/customers";

function Customers({ onBack }) {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active",
  });

  // ==========================================
  // GET CUSTOMERS FROM BACKEND
  // ==========================================

  const loadCustomers = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await response.json();

      setCustomers(data);
    } catch (error) {
      console.error("Error loading customers:", error);
      alert("Could not connect to backend.");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.phone} ${customer.company}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ==========================================
  // FORM INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setEditingCustomer(null);

    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "Active",
    });

    setShowForm(false);
  };

  // ==========================================
  // OPEN ADD CUSTOMER FORM
  // ==========================================

  const openAddForm = () => {
    setEditingCustomer(null);

    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "Active",
    });

    setShowForm(true);
  };

  // ==========================================
  // ADD CUSTOMER
  // ==========================================

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    if (
      !newCustomer.name.trim() ||
      !newCustomer.email.trim() ||
      !newCustomer.phone.trim()
    ) {
      alert("Please fill Name, Email and Phone.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add customer");
      }

      // Add returned customer to the current list
      setCustomers((prevCustomers) => [
        ...prevCustomers,
        data,
      ]);

      alert("Customer added successfully!");

      resetForm();

    } catch (error) {
      console.error("Error adding customer:", error);
      alert(`Could not add customer. ${error.message}`);
    }
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);

    setNewCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company || "",
      status: customer.status || "Active",
    });

    setShowForm(true);
  };

  // ==========================================
  // UPDATE CUSTOMER
  // ==========================================

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();

    if (
      !newCustomer.name.trim() ||
      !newCustomer.email.trim() ||
      !newCustomer.phone.trim()
    ) {
      alert("Please fill Name, Email and Phone.");
      return;
    }

    if (!editingCustomer) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${editingCustomer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCustomer),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update customer");
      }

      // Replace old customer with updated customer
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === data.id
            ? data
            : customer
        )
      );

      alert("Customer updated successfully!");

      resetForm();

    } catch (error) {
      console.error("Error updating customer:", error);
      alert(`Could not update customer. ${error.message}`);
    }
  };

  // ==========================================
  // DELETE CUSTOMER
  // ==========================================

  const deleteCustomer = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete customer");
      }

      // Remove deleted customer from React list
      setCustomers((prevCustomers) =>
        prevCustomers.filter(
          (customer) => customer.id !== id
        )
      );

      alert("Customer deleted successfully!");

    } catch (error) {
      console.error("Error deleting customer:", error);
      alert(`Could not delete customer. ${error.message}`);
    }
  };

  // ==========================================
  // FORM SUBMIT
  // ==========================================

  const handleSubmit = (e) => {
    if (editingCustomer) {
      handleUpdateCustomer(e);
    } else {
      handleAddCustomer(e);
    }
  };

  // ==========================================
  // RETURN UI
  // ==========================================

  return (
    <div className="customers-container">

      {/* BACK BUTTON */}
      <button
        className="back-btn"
        onClick={onBack}
      >
        ← Back
      </button>


      {/* HEADER */}
      <div className="customers-header">

        <div>

          <p className="page-label">
            ERP • CRM MANAGEMENT SYSTEM
          </p>

          <h1>
            👥 Total Customers
          </h1>

          <p className="page-subtitle">
            Manage and organize all your customer information.
          </p>

        </div>


        <button
          className="add-customer-btn"
          onClick={openAddForm}
        >
          + Add Customer
        </button>

      </div>


      {/* STATS */}
      <div className="customer-stats">

        <div className="stat-card">

          <span>
            Total Customers
          </span>

          <strong>
            {customers.length}
          </strong>

        </div>


        <div className="stat-card">

          <span>
            Active Customers
          </span>

          <strong>
            {
              customers.filter(
                (customer) =>
                  customer.status === "Active"
              ).length
            }
          </strong>

        </div>


        <div className="stat-card">

          <span>
            Inactive Customers
          </span>

          <strong>
            {
              customers.filter(
                (customer) =>
                  customer.status === "Inactive"
              ).length
            }
          </strong>

        </div>

      </div>


      {/* ADD / EDIT FORM */}

      {showForm && (

        <form
          className="customer-form"
          onSubmit={handleSubmit}
        >

          <h2>
            {editingCustomer
              ? "Edit Customer"
              : "Add New Customer"}
          </h2>


          <div className="form-grid">

            {/* NAME */}

            <div>

              <label>
                Name
              </label>

              <input
                type="text"
                name="name"
                value={newCustomer.name}
                onChange={handleChange}
                placeholder="Enter customer name"
              />

            </div>


            {/* EMAIL */}

            <div>

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={newCustomer.email}
                onChange={handleChange}
                placeholder="Enter email"
              />

            </div>


            {/* PHONE */}

            <div>

              <label>
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={newCustomer.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />

            </div>


            {/* COMPANY */}

            <div>

              <label>
                Company
              </label>

              <input
                type="text"
                name="company"
                value={newCustomer.company}
                onChange={handleChange}
                placeholder="Enter company"
              />

            </div>


            {/* STATUS */}

            <div>

              <label>
                Status
              </label>

              <select
                name="status"
                value={newCustomer.status}
                onChange={handleChange}
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

          <div className="form-buttons">

            <button
              type="submit"
              className="save-btn"
            >
              {editingCustomer
                ? "Update Customer"
                : "Save Customer"}
            </button>


            <button
              type="button"
              className="cancel-btn"
              onClick={resetForm}
            >
              Cancel
            </button>

          </div>

        </form>

      )}


      {/* CUSTOMER LIST */}

      <div className="customer-table-card">

        <div className="table-top">

          <div>

            <h2>
              Customer List
            </h2>

            <p>
              View and manage your customers
            </p>

          </div>


          {/* SEARCH */}

          <input
            className="customer-search"
            type="text"
            placeholder="🔍 Search customers..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>
                  Customer
                </th>

                <th>
                  Email
                </th>

                <th>
                  Phone
                </th>

                <th>
                  Company
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredCustomers.length > 0 ? (

                filteredCustomers.map((customer) => (

                  <tr key={customer.id}>

                    <td className="customer-name">
                      👤 {customer.name}
                    </td>

                    <td>
                      {customer.email}
                    </td>

                    <td>
                      {customer.phone}
                    </td>

                    <td>
                      {customer.company}
                    </td>

                    <td>

                      <span
                        className={`status-badge ${
                          customer.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        ● {customer.status}
                      </span>

                    </td>


                    <td className="action-buttons">

                      {/* EDIT */}

                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() =>
                          handleEditCustomer(customer)
                        }
                      >
                        Edit
                      </button>


                      {/* DELETE */}

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                          deleteCustomer(customer.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="no-results"
                  >
                    No customers found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Customers;