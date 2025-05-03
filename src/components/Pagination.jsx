import React, { useEffect, useRef } from "react";
import { useState } from "react";
import PokemonCard from "./PokemonCard";

function Pagination(props) {
  const ITEMS_PER_PAGE = 20;
  const [page, setPage] = useState(1);
  const [pokemonArray, setPokemonArray] = useState([]);
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSearchedPokemon(props.searchValue);
  }, [props.searchValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=2000`
        );
        const arr = await res.json();

        const nestedfetches = arr.results.map((obj) =>
          fetch(obj.url).then((r) => r.json())
        );
        const results = await Promise.all(nestedfetches);
        setLoading(false)
        setPokemonArray(results);
        
      } catch (err) { 
        console.log("Hello")
      }
    };
    fetchData();
  }, []);

  const filterArray = pokemonArray.filter((obj) =>
    obj.name.toLowerCase().startsWith(searchedPokemon.toLowerCase())
  );

  const totalPages = Math.ceil(filterArray.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filterArray.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  if (loading) return <p className="text-center text-gray-500 mt-8">Loading Pokémons...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">Error: {error}</p>;
  console.log(filterArray);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 ">
        {paginated.map((c) => (
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
        <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
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

