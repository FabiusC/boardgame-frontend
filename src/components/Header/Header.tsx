import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/icons/logo.svg";

interface HeaderProps {
  toggleMenu: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleMenu,
  darkMode,
  toggleDarkMode,
}) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIcon, setUserIcon] = useState<string | null>(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData);
      setIsLoggedIn(true);
      setUserIcon(user.icon || "👤");
    }
  }, []);

  const handleAuthClick = () => {
    navigate(isLoggedIn ? "/me" : "/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      />
      <input type="text" placeholder="Search..." className="search-box" />
      <div className="theme-toggle">
        <label className="toggle-switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
      </div>

      {/* Render user icon if logged in, otherwise show "Log In" */}
      <button className="auth-button" onClick={handleAuthClick}>
        {isLoggedIn ? (
          <img src={userIcon!} alt="User Icon" className="user-icon" />
        ) : (
          "Log In"
        )}
      </button>
    </header>
  );
};

export default Header;
