import React from "react";
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

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="header">
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <img src={logo} alt="Logo" className="logo" />
      <input type="text" placeholder="Search..." className="search-box" />
      <div className="theme-toggle">
        <label className="toggle-switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
      </div>
      <button className="login-button" onClick={handleLoginClick}>
        Log In
      </button>
    </header>
  );
};

export default Header;
