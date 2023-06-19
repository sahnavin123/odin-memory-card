import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import Card from "./components/Card";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 1; i <= 14; i++) {
          const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
          const response = await fetch(url, { mode: "cors" });
          const pokemonJsonData = await response.json();
          const name = pokemonJsonData.name.toUpperCase();
          const id = pokemonJsonData.id;
          const image = pokemonJsonData.sprites.front_default;
          data.push({ name, id, image });
        }
        setPokemonData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (arr) => {
    const shuffledArray = [...arr];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleClick = (id) => {
    if (selectedIds.includes(id)) {
      setCurrentScore(0);
      setSelectedIds([]);
      return;
    }
    setSelectedIds([...selectedIds, id]);

    if (currentScore + 1 > highScore) setHighScore(currentScore + 1);

    setCurrentScore(currentScore + 1);

    const shuffledCards = shuffleArray(pokemonData);
    setPokemonData(shuffledCards);
  };

  return (
    <div className="App">
      <ScoreBoard currentScore={currentScore} highScore={highScore} />
      <div className="cards">
        {pokemonData.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => handleClick(pokemon.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
