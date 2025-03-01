import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import SideMenu from './components/SideMenu/SideMenu';
import GameCard from './components/GameCard/GameCard';
import './App.css';

interface Game {
  id: number;
  name: string;
  image: string;
}

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/games');
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="App">
      <Header 
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <SideMenu isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      <div className="game-list">
        {games.map((game) => (
          <GameCard key={game.id} name={game.name} image={game.image} />
        ))}
      </div>
    </div>
  );
};

export default App;
