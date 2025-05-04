import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import Pokeball from "../assets/pokeball.png"

function Pagination(props) {
  const ITEMS_PER_PAGE = 20;
  const [page, setPage] = useState(1);
  const [pokemonArray, setPokemonArray] = useState([]);
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokemonTypesSelected, setPokemonTypesSelected] = useState([]);

  useEffect(() => {
    setSearchedPokemon(props.searchValue);
    setPage(1)
  }, [props.searchValue]);

  useEffect(() => {
    setPokemonTypesSelected(props.selectedPokemonTypes);
    setPage(1)
  }, [props.selectedPokemonTypes]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=2000`);
        const arr = await res.json();

        const nestedfetches = arr.results.map((obj) =>
          fetch(obj.url).then((r) => r.json())
        );
        const results = await Promise.all(nestedfetches);
        setLoading(false);
        setPokemonArray(results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const filterArray = pokemonArray.filter((obj) =>
    obj.name.toLowerCase().startsWith(searchedPokemon.toLowerCase())
  );

  const typesArr = (obj) => {
    const typesArray = [];
    obj.map((a) => {
      typesArray.push(a.type.name.toUpperCase());
    });
    return typesArray;
  };

  const subSet = (objType, selectedTypes) => {
    return selectedTypes.every((element) => objType.includes(element));
  };

  const DisplayArr =
    pokemonTypesSelected.length > 0
      ? filterArray.filter((p) =>
          subSet(typesArr(p.types), pokemonTypesSelected)
        )
      : filterArray;

  
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginated = DisplayArr.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(paginated.length / ITEMS_PER_PAGE);

  function animateFunc() {
    return (
      <>
        <div className="flex flex-col justify-center items-center m-[12%]">
          <img
            className=" w-14 animate-bounce"
            src={Pokeball}
            alt="Pokeball"
          />
          <p className="text-center text-gray-500 mt-6">Loading Pokémons...</p>
        </div>
      </>
    );
  }

  if (loading) {
    return animateFunc();
  }

  return (
    <>
      {paginated.length == 0 ? (
        <p className="flex justify-center items-center">"No Pokémon found"</p>
      ) : (
        <div className=" relative grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 ">
          {paginated.map((c) => (
            <PokemonCard
              key={c.id}
              name={c.name}
              img={c.sprites.front_default}
              types={c.types}
            />
          ))}
        </div>
      )}

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
        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
        disabled = {page===totalPages}
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
