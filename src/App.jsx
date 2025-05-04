import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import TypeFilter from "./components/TypeFilter";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [selectedPokemonTypes, setSelectedPokemonTypes] = useState([]);
  const handleSearch = (value) => {
    setPokemon(value);
  };

  const handleSelectedTypes = (pokemonTypesArray)=>{
    setSelectedPokemonTypes(pokemonTypesArray)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100">
      <header className="bg-indigo-600 text-white py-6 shadow-md">
        <h1 className="text-center text-4xl font-extrabold">Pokédex</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <TypeFilter selectedTypes = {handleSelectedTypes} />
        <div className="mb-6">
          <SearchBar pokemon={handleSearch} />
        </div>
        <Pagination searchValue={pokemon} selectedPokemonTypes = {selectedPokemonTypes} />
      </main>
    </div>
  );
}

export default App;