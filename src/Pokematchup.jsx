import React, { useState } from 'react';
import './App.css'; 

const typeData = {
  Fire: { emoji: '🔥', strongAgainst: ['Grass', 'Ice', 'Bug', 'Steel'], weakAgainst: ['Water', 'Rock', 'Fire'] },
  Water: { emoji: '💧', strongAgainst: ['Fire', 'Ground', 'Rock'], weakAgainst: ['Electric', 'Grass', 'Water'] },
  Grass: { emoji: '🌿', strongAgainst: ['Water', 'Ground', 'Rock'], weakAgainst: ['Fire', 'Bug', 'Flying', 'Grass'] },
  Electric: { emoji: '⚡', strongAgainst: ['Water', 'Flying'], weakAgainst: ['Ground', 'Electric'] },
};

const samplePokemon = {
  Fire: ['Charmander', 'Vulpix'],
  Water: ['Squirtle', 'Psyduck'],
  Grass: ['Bulbasaur', 'Oddish'],
  Electric: ['Pikachu', 'Magnemite'],
};

function TypeCard({ type, isStrong, isWeak }) {
  const glowColor = isStrong ? '#00ff99' : isWeak ? '#ff6666' : '#cccccc';

  return (
    <div
      className="type-card"
      style={{
        border: `2px solid ${glowColor}`,
        boxShadow: `0 0 10px ${glowColor}`,
        padding: '1rem',
        borderRadius: '12px',
        margin: '1rem',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <h3>{typeData[type].emoji} {type}</h3>
      <p>Sample Pokémon:</p>
      <ul>
        {samplePokemon[type].map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

function TypeMatchupExplorer() {
  const [attacker, setAttacker] = useState('Fire');
  const [defender, setDefender] = useState('Grass');

  const getEffectiveness = () => {
    if (typeData[attacker].strongAgainst.includes(defender)) return 'Super Effective 💥';
    if (typeData[attacker].weakAgainst.includes(defender)) return 'Not Very Effective 😅';
    return 'Neutral ⚖️';
  };

  const simulateBattle = () => {
    const effectiveness = getEffectiveness();
    const messages = {
      'Super Effective 💥': `${attacker} lands a critical hit!`,
      'Not Very Effective 😅': `${attacker} barely scratches ${defender}...`,
      'Neutral ⚖️': `It's a fair fight between ${attacker} and ${defender}.`,
    };
    return messages[effectiveness];
  };

  return (
    <div className="matchup-container">
      <h1>Pokémon Type Matchup Explorer</h1>

      <div className="selectors">
        <label>
          Attacker:
          <select value={attacker} onChange={(e) => setAttacker(e.target.value)}>
            {Object.keys(typeData).map((type) => (
              <option key={type} value={type}>
                {typeData[type].emoji} {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          Defender:
          <select value={defender} onChange={(e) => setDefender(e.target.value)}>
            {Object.keys(typeData).map((type) => (
              <option key={type} value={type}>
                {typeData[type].emoji} {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="result">
        <h2>
          {typeData[attacker].emoji} {attacker} vs {typeData[defender].emoji} {defender}
        </h2>
        <p>{getEffectiveness()}</p>
      </div>

      <div className="battle-mode">
        <h3>Battle Mode ⚔️</h3>
        <p>{simulateBattle()}</p>
      </div>

      <div className="type-cards">
        <TypeCard
          type={attacker}
          isStrong={typeData[attacker].strongAgainst.includes(defender)}
          isWeak={typeData[attacker].weakAgainst.includes(defender)}
        />
        <TypeCard
          type={defender}
          isStrong={typeData[defender].strongAgainst.includes(attacker)}
          isWeak={typeData[defender].weakAgainst.includes(attacker)}
        />
      </div>
    </div>
  );
}

export default TypeMatchupExplorer;
