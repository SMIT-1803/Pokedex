import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";

function App() {
  const [pokemon, setPokemon] = useState("");

  const handleSearch = (value) => {
    setPokemon(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100">
      <header className="bg-indigo-600 text-white py-6 shadow-md">
        <h1 className="text-center text-4xl font-extrabold">Pokedex</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <SearchBar pokemon={handleSearch} />
        </div>
        <Pagination searchValue={pokemon} />
      </main>
    </div>
  );
}

export default App;