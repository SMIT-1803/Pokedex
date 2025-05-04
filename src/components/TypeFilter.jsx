import React, { useState } from "react";
import PokemonTypes from "../PokemonTypes/Types.json";
import arrow from "../assets/Arrow.png"

function SortFilter(props) {
  const [pokemonTypesInfo] = useState(PokemonTypes.types);
  const [selectedPokemonTypes, setSelectedPokemonTypes] = useState([]);
  const [typeMenuStatus, setTypeMenuStatus] = useState("hidden");

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const typeValue = value.toUpperCase();
    const newSelected = checked
      ? [...selectedPokemonTypes, typeValue]
      : selectedPokemonTypes.filter((t) => t !== typeValue);

    setSelectedPokemonTypes(newSelected);
    props.selectedTypes(newSelected);
  };

  function dropDown() {
    typeMenuStatus === "hidden"
      ? setTypeMenuStatus("visible")
      : setTypeMenuStatus("hidden");
  }
  return (
    <>
      <div
        onClick={dropDown}
        className="flex items-center justify-between
             bg-teal-600 hover:bg-teal-700 active:bg-teal-800
             text-gray-900 dark:text-gray-100
             py-3 px-4 my-2 mx-0.5
             rounded-xl
             shadow-md hover:shadow-lg
             transition-all duration-200
             cursor-pointer"
      >
        <span className="text-base font-semibold">
          {typeMenuStatus === "hidden" ? "Show" : "Hide"} Advanced Search
        </span>
        <img
          src={arrow}
          alt="Toggle"
          className={`w-6 h-6 transform transition-transform duration-200
                ${typeMenuStatus === "hidden" ? "rotate-0" : "rotate-180"}`}
        />
      </div>

      <div className={`${typeMenuStatus}`}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Sort by Type
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pokemonTypesInfo.map((type) => (
              <label
                key={type.id}
                htmlFor={`type-${type.id}`}
                className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-colors duration-200 cursor-pointer"
              >
                <span
                  className={`px-2 py-1 rounded-xl text-white uppercase text-xs font-medium ${type.bgClass}`}
                >
                  {type.name}
                </span>
                <input
                  id={`type-${type.id}`}
                  type="checkbox"
                  value={type.name}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SortFilter;
