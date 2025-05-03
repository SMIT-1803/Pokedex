import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch Pokémon data");
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setLoading(false);
        return fetch(data.species.url);
      })
      .then((res) => res.json())
      .then((data) =>
        setDescription(
          data.flavor_text_entries[0].flavor_text.replaceAll('', ' ')
        )
      )
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  const Loader = () => (
    <div className="flex flex-col justify-center items-center h-screen">
      <img
        src="src/assets/pokeball.png"
        alt="Loading Pokéball"
        className="w-16 h-16 animate-spin"
      />
      <p className="mt-4 text-gray-500 uppercase tracking-wide">
        Loading Pokémon...
      </p>
    </div>
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="flex justify-center mt-20">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            {pokemon.name.toUpperCase()}
          </h1>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="flex flex-col items-center space-y-6">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-56 h-56 object-contain drop-shadow-lg"
            />
            <div className="w-full">
              <p className="text-gray-600 uppercase mb-2 font-semibold">
                Type
              </p>
              <div className="flex flex-wrap gap-3">
                {pokemon.types.map((t) => (
                  <span
                    key={t.slot}
                    className={`px-4 py-1 rounded-full text-white uppercase text-xs font-semibold shadow-sm transition-transform transform hover:scale-105 ${
                      {
                        normal: 'bg-gray-400',
                        fire: 'bg-red-500',
                        water: 'bg-blue-500',
                        electric: 'bg-yellow-400',
                        grass: 'bg-green-500',
                        ice: 'bg-blue-200',
                        fighting: 'bg-red-700',
                        poison: 'bg-purple-500',
                        ground: 'bg-yellow-600',
                        flying: 'bg-sky-300',
                        psychic: 'bg-pink-500',
                        bug: 'bg-green-700',
                        rock: 'bg-yellow-700',
                        ghost: 'bg-indigo-700',
                        dark: 'bg-gray-800',
                        dragon: 'bg-indigo-800',
                        steel: 'bg-gray-500',
                        fairy: 'bg-pink-300',
                      }[t.type.name] || 'bg-gray-500'
                    }`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <p className="text-gray-700 text-lg leading-relaxed">
              {description}
            </p>
            <div>
              <p className="text-gray-600 uppercase mb-2 font-semibold">
                Abilities
              </p>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((c) => (
                  <span
                    key={c.slot}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium"
                  >
                    {c.ability.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg shadow-inner grid grid-cols-2 text-center">
              <div>
                <p className="text-gray-500 uppercase text-xs tracking-wide">
                  Height
                </p>
                <p className="text-xl font-semibold mt-1">
                  {pokemon.height * 10} cm
                </p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-xs tracking-wide">
                  Weight
                </p>
                <p className="text-xl font-semibold mt-1">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
