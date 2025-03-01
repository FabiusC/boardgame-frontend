import React from 'react';
import './SideMenu.css';

interface SideMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleMenu}>×</button>
      <ul>
        <li>Account</li>
        <li>Favorites</li>
        <li>Suggestions</li>
        <li>Credits</li>
      </ul>
    </div>
  );
};

export default SideMenu;
