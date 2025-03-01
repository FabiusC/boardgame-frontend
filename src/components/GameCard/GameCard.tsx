import React from 'react';
import './GameCard.css';

interface GameCardProps {
  name: string;
  image: string;
}

const GameCard: React.FC<GameCardProps> = ({ name, image }) => {
  return (
    <div className="game-card">
      <img src={image} alt={name} className="game-image" />
      <h3 className="game-name">{name}</h3>
    </div>
  );
};

export default GameCard;
