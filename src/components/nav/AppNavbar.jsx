import React, { useState } from "react";
import { getImageUrl } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AppNavbar.css"; 

const AppNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch("https://sebrain.netlify.app/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="outer">
        <img src={getImageUrl("nav/Brain.png")} alt="" className="brain_img" />
        <h1 className="logHead">SecondBrain</h1>
      </div>

      <div className="menu">
        <img
          className="menuBtn"
          src={menuOpen ? getImageUrl("nav/closeIcon.png") : getImageUrl("nav/menuIcon.png")}
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul className={`menuItems ${menuOpen ? "menuOpen" : ""}`} onClick={() => setMenuOpen(false)}>
          <li>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AppNavbar;
