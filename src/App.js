import React, { useEffect, useState } from 'react';
import PokemonThumb from './components/PokemonThumb';

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  const getAllPokemons = async () => {
    try {
      const res = await fetch(loadMore);
      const data = await res.json();

      setLoadMore(data.next);

      const newPokemonData = [];
      for (const pokemon of data.results) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const pokemonData = await res.json();
        newPokemonData.push(pokemonData);
      }

      setAllPokemons((currentList) => [...currentList, ...newPokemonData]);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };

  useEffect(() => {
    getAllPokemons();
  }, []);


  return (
    <div className="app-contaner">
      <h1>Pokemon Codex</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemonStats, index) => (
            <PokemonThumb
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />
          ))}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          Load more
        </button>
      </div>
    </div>
  );
};


export default App;