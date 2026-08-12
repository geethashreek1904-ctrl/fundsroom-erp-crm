import { useState } from "react";
import "./Login.css";

function Login({ onBack, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    alert("Login successful!");

    // Go to Dashboard after successful login
    onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <button
          type="button"
          className="back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="login-logo">
          Fundsroom <span>ERP-CRM</span>
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to manage your business
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login-submit"
          >
            Login
          </button>

        </form>

        <p className="login-footer">
          Fundsroom ERP-CRM Management System
        </p>

      </div>
    </div>
  );
}

export default Login;