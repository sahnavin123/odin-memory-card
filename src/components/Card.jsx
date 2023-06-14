import React from "react";

const Card = ({ pokemon, onClick }) => {
  const { name, image } = pokemon;

  return (
    <div className="card" onClick={onClick}>
      <p>{name}</p>
      <img src={image} alt="pokemon-img" />
    </div>
  );
};

export default Card;
