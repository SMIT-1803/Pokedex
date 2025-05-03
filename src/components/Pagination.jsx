import React, { useEffect, useRef } from "react";
import { useState } from "react";
import PokemonCard from "./PokemonCard";

function Pagination(props) {
  const [page, setPage] = useState(1);
  const [isDisabledPrev, setIsDisabledPrev] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(false);
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

  function nextPage() {
    setPage(prev=>prev+1)
    page==5?setIsDisabledNext(true):setIsDisabledNext(false)
  }

  function previousPage() {
    page==1?(setIsDisabledNext(true)):setIsDisabledNext(false)
    if(page==1){
      setIsDisabledNext(true)
    }
    else{
      setIsDisabledNext(false)
      setPage(prev=>prev-1)
    }
  }
  const filterArray = pokemonArray.filter((obj) =>
    obj.name.toLowerCase().includes(searchedPokemon.toLowerCase())
  );

  console.log(filterArray)


  return (
    <>
      <div className="grid grid-cols-4 place-items-center ">
        {filterArray.map((c) => (
          <PokemonCard
            key = {c.id}
            name={c.name}
            img={c.sprites.front_default}
            types={c.types}
          />
        ))}
      </div>
      <div className=" flex justify-center items-center gap-4">
        <button
          className="bg-amber-400 pt-2 pb-2 pr-3 pl-3 rounded-md m-2 w-20"
          onClick={previousPage}
          disabled={isDisabledPrev}
        >
          Previous
        </button>
        <button
          className="bg-amber-400 pt-2 pb-2 pr-3 pl-3 rounded-md m-2 w-20"
          onClick={nextPage}
          disabled={isDisabledNext}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Pagination;
