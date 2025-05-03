import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch Pokémon data");
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  function animateFunc() {
    return (
      <>
        <div className="flex flex-col justify-center items-center m-[12%]">
          <img
            className=" w-14 animate-bounce"
            src="src/assets/pokeball.png"
            alt="Pokeball"
          />
          <p className="text-center text-gray-500 mt-8">Loading Pokémons...</p>
        </div>
      </>
    );
  }

  if (loading) {
    return animateFunc();
  }
  if (error) return <p className="text-center text-red-500 mt-8">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white text-center">
          <h1 className="text-5xl font-extrabold">{pokemon.name.toUpperCase()}</h1>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center items-center">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-48 h-48 object-contain"
            />
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-sm uppercase text-gray-500">Height</p>
                <p className="text-xl font-semibold">{pokemon.height * 10} cm</p>
              </div>
              <div className="text-center">
                <p className="text-sm uppercase text-gray-500">Weight</p>
                <p className="text-xl font-semibold">{pokemon.weight / 10} kg</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600 uppercase mb-2">Type</p>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((c) => (
                  <span
                    key={c.slot}
                    className={`px-3 py-1 rounded-full text-white uppercase text-sm ${
                      c.type.name === 'fire'
                        ? 'bg-red-500'
                        : c.type.name === 'water'
                        ? 'bg-blue-500'
                        : c.type.name === 'grass'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}>
                    {c.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
