import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import "./signup.css"; 

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("request sent")
      const res = await axios.post("/api/auth/signup", form, { withCredentials: true });
      setUser(res.data.user);
      console.log("before navigation")
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleGoogle = () => {
    window.location.href = "https://sebrain.netlify.app/api/auth/google";
  };

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      <button onClick={handleGoogle} className="google-btn">Continue with Google</button>
    </div>
  );
};

export default Signup;