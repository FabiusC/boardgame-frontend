import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import GameCard from "./components/GameCard/GameCard";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notification from "./components/Notification/Notification";
import Me from "./components/Me/Me";
import "./App.css";

interface Game {
  id: number;
  name: string;
  image: string;
}

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/games");
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error:", error);
        setNotification("Failed to load games.");
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className="App">
        {notification && (
          <Notification
            text={notification}
            onClose={() => setNotification(null)}
          />
        )}
        <Header
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <SideMenu
          isOpen={isMenuOpen}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        />

        <Routes>
          <Route
            path="/"
            element={
              <div className="game-list">
                {games.map((game) => (
                  <GameCard key={game.id} name={game.name} image={game.image} />
                ))}
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me" element={<Me />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
