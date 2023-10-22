import React, { useState, useEffect } from "react";

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const pokemons = await response.json();
    setPokemons(pokemons);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}