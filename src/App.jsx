import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";

function App() {
  const [pokemon, setPokemon] = useState("");
  function pokemonEntered(a) {
    setPokemon(a);
    console.log(pokemon);
  }

  return (
    <>
        <h1 className="flex justify-center items-center">Pokedex</h1>
        <SearchBar pokemon={pokemonEntered} />
        <Pagination searchValue = {pokemon} />
    </>
  );
}

export default App;
