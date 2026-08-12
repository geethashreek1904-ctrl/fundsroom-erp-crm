import express from "express";
import cors from "cors";

const app = express();

const PORT = 5000;

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// CUSTOMER DATA
// ===============================
let customers = [
  {
    id: 1,
    name: "A Kani Kumar",
    email: "kani@example.com",
    phone: "+91 98765 11122",
    company: "Kani Enterprises",
    status: "Active",
  },
  {
    id: 2,
    name: "K S Kavya Sharma",
    email: "kavya@example.com",
    phone: "+91 98765 22233",
    company: "Sharma Solutions",
    status: "Active",
  },
  {
    id: 3,
    name: "Rohit Singh",
    email: "rohit@example.com",
    phone: "+91 98765 33344",
    company: "Singh Industries",
    status: "Inactive",
  },
];

// ===============================
// EMPLOYEE DATA
// ===============================
let employees = [
  {
    id: 1,
    name: "K S Kavya Sharma",
    email: "kavya@example.com",
    phone: "+91 98765 22233",
    department: "Development",
    role: "Software Engineer",
    status: "Active",
  },
  {
    id: 2,
    name: "Rohit Singh",
    email: "rohit@example.com",
    phone: "+91 98765 33344",
    department: "Sales",
    role: "Sales Executive",
    status: "Active",
  },
  {
    id: 3,
    name: "Sneha Menon",
    email: "sneha@example.com",
    phone: "+91 98765 44455",
    department: "HR",
    role: "HR Manager",
    status: "Active",
  },
  {
    id: 4,
    name: "A Kani Kumar",
    email: "kani@example.com",
    phone: "+91 98765 11122",
    department: "Finance",
    role: "Accountant",
    status: "Inactive",
  },
];

// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.json({
    message: "Fundsroom ERP-CRM Backend is running!",
  });
});

// =====================================================
// CUSTOMER APIs
// =====================================================

// GET ALL CUSTOMERS
app.get("/api/customers", (req, res) => {
  res.json(customers);
});

// ADD CUSTOMER
app.post("/api/customers", (req, res) => {
  try {
    const { name, email, phone, company, status } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "Name, email and phone are required.",
      });
    }

    const newId =
      customers.length > 0
        ? Math.max(...customers.map((customer) => customer.id)) + 1
        : 1;

    const newCustomer = {
      id: newId,
      name,
      email,
      phone,
      company: company || "",
      status: status || "Active",
    };

    customers.push(newCustomer);

    console.log("Customer added:", newCustomer);

    return res.status(201).json(newCustomer);
  } catch (error) {
    console.error("POST customer error:", error);

    return res.status(500).json({
      message: "Failed to add customer.",
    });
  }
});

// UPDATE CUSTOMER
app.put("/api/customers/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const index = customers.findIndex(
      (customer) => customer.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Customer not found.",
      });
    }

    const updatedCustomer = {
      ...customers[index],
      ...req.body,
      id: customers[index].id,
    };

    customers[index] = updatedCustomer;

    console.log("Customer updated:", updatedCustomer);

    return res.json(updatedCustomer);
  } catch (error) {
    console.error("PUT customer error:", error);

    return res.status(500).json({
      message: "Failed to update customer.",
    });
  }
});

// DELETE CUSTOMER
app.delete("/api/customers/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const index = customers.findIndex(
      (customer) => customer.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Customer not found.",
      });
    }

    const deletedCustomer = customers[index];

    customers.splice(index, 1);

    console.log("Customer deleted:", deletedCustomer);

    return res.json({
      message: "Customer deleted successfully.",
      customer: deletedCustomer,
    });
  } catch (error) {
    console.error("DELETE customer error:", error);

    return res.status(500).json({
      message: "Failed to delete customer.",
    });
  }
});

// =====================================================
// EMPLOYEE APIs
// =====================================================

// GET ALL EMPLOYEES
app.get("/api/employees", (req, res) => {
  res.json(employees);
});

// ADD EMPLOYEE
app.post("/api/employees", (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      role,
      status,
    } = req.body;

    if (!name || !email || !phone || !role) {
      return res.status(400).json({
        message: "Name, email, phone and role are required.",
      });
    }

    const newId =
      employees.length > 0
        ? Math.max(...employees.map((employee) => employee.id)) + 1
        : 1;

    const newEmployee = {
      id: newId,
      name,
      email,
      phone,
      department: department || "Development",
      role,
      status: status || "Active",
    };

    employees.push(newEmployee);

    console.log("Employee added:", newEmployee);

    return res.status(201).json(newEmployee);
  } catch (error) {
    console.error("POST employee error:", error);

    return res.status(500).json({
      message: "Failed to add employee.",
    });
  }
});

// UPDATE EMPLOYEE
app.put("/api/employees/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const index = employees.findIndex(
      (employee) => employee.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }

    const updatedEmployee = {
      ...employees[index],
      ...req.body,
      id: employees[index].id,
    };

    employees[index] = updatedEmployee;

    console.log("Employee updated:", updatedEmployee);

    return res.json(updatedEmployee);
  } catch (error) {
    console.error("PUT employee error:", error);

    return res.status(500).json({
      message: "Failed to update employee.",
    });
  }
});

// DELETE EMPLOYEE
app.delete("/api/employees/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    const index = employees.findIndex(
      (employee) => employee.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }

    const deletedEmployee = employees[index];

    employees.splice(index, 1);

    console.log("Employee deleted:", deletedEmployee);

    return res.json({
      message: "Employee deleted successfully.",
      employee: deletedEmployee,
    });
  } catch (error) {
    console.error("DELETE employee error:", error);

    return res.status(500).json({
      message: "Failed to delete employee.",
    });
  }
});

// ===============================
// 404 ROUTE
// IMPORTANT: THIS MUST BE LAST
// ===============================
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
  console.log("");
  console.log("====================================");
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Customer API ready!");
  console.log("Employee API ready!");
  console.log("====================================");
  console.log("");
});