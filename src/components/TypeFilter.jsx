import React, { useState } from "react";
import PokemonTypes from "../PokemonTypes/Types.json";

function SortFilter(props) {
  const [pokemonTypesInfo] = useState(PokemonTypes.types);
  const [selectedPokemonTypes, setSelectedPokemonTypes] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const typeValue = value.toUpperCase();
    const newSelected = checked
      ? [...selectedPokemonTypes, typeValue]
      : selectedPokemonTypes.filter((t) => t !== typeValue);

    setSelectedPokemonTypes(newSelected);
    props.selectedTypes(newSelected);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
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
              className={`px-2 py-1 rounded-full text-white uppercase text-xs font-medium ${type.bgClass}`}
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
  );
}

export default SortFilter;




// import React, { useState, useRef, useEffect } from "react";
// import PokemonTypes from "../PokemonTypes/Types.json";

// function SortFilter({ selectedTypes: onTypeChange }) {
//   const [types] = useState(PokemonTypes.types);
//   const [selected, setSelected] = useState([]);
//   const [open, setOpen] = useState(false);
//   const containerRef = useRef(null);

//   const handleChange = (e) => {
//     const { value, checked } = e.target;
//     const upper = value.toUpperCase();
//     const updated = checked
//       ? [...selected, upper]
//       : selected.filter((t) => t !== upper);

//     setSelected(updated);
//     onTypeChange(updated);
//   };

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (containerRef.current && !containerRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative inline-block text-left" ref={containerRef}>
//       <button
//         type="button"
//         className="inline-flex justify-between items-center w-48 px-4 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-medium rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
//         onClick={() => setOpen((o) => !o)}
//       >
//         Filter by Type
//         <svg
//           className={`ml-2 h-5 w-5 transition-transform ${open ? "transform rotate-180" : ""}`}
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>

//       {open && (
//         <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
//           <div className="py-2 px-3 grid grid-cols-1 gap-2">
//             {types.map(({ id, name, bgClass }) => {
//               const isChecked = selected.includes(name.toUpperCase());
//               return (
//                 <label
//                   key={id}
//                   htmlFor={`type-${id}`}
//                   className="flex items-center space-x-2 cursor-pointer"
//                 >
//                   <span className={`w-4 h-4 inline-block rounded ${bgClass}`}></span>
//                   <span className="flex-1 text-sm text-gray-800 dark:text-gray-100">
//                     {name}
//                   </span>
//                   <input
//                     id={`type-${id}`}
//                     type="checkbox"
//                     value={name}
//                     checked={isChecked}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
//                   />
//                 </label>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SortFilter;
