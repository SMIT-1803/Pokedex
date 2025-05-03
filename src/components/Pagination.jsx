import React, { useEffect, useRef } from "react";
import { useState } from "react";
import PokemonCard from "./PokemonCard";

function Pagination(props) {
  const [page, setPage] = useState(1);
  const [pokemonArray, setPokemonArray] = useState([]);
  const [searchedPokemon, setSearchedPokemon] = useState("");

  useEffect(() => {
    setSearchedPokemon(props.searchValue);
  }, [props.searchValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = 20;
        const offset = (page - 1) * limit;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const arr = await res.json();

        const nestedfetches = arr.results.map((obj) =>
          fetch(obj.url).then((r) => r.json())
        );
        const results = await Promise.all(nestedfetches);
        setPokemonArray(results);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, [page]);

  const filterArray = pokemonArray.filter((obj) =>
    obj.name.toLowerCase().includes(searchedPokemon.toLowerCase())
  );

  console.log(filterArray);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 ">
        {filterArray.map((c) => (
          <PokemonCard
            key={c.id}
            name={c.name}
            img={c.sprites.front_default}
            types={c.types}
          />
        ))}
      </div>
      <div className=" flex justify-center items-center gap-4 p-5">
        <button
          onClick={() => setPage((n) => Math.max(1, n - 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg font-semibold 
                     bg-indigo-500 hover:bg-indigo-600 
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     text-white"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">Page {page}</span>
        <button
          onClick={() => setPage((n) => n + 1)}
          className="px-4 py-2 rounded-lg font-semibold 
                     bg-indigo-500 hover:bg-indigo-600 
                     text-white"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Pagination;
