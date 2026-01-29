import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import "./login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("first");
    try {
      const res = await axios.post("/api/auth/login", form, { withCredentials: true });
    console.log("second");
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogle = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="login-text">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <button className="google-btn" onClick={handleGoogle}>
        Continue with Google
      </button>
    </div>
  );
};

export default Login;