import React, { useState } from "react";

function SearchBar({ pokemon }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    pokemon(value);
  };

  return (
    <div className="flex justify-center">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search Pokémon..."
        className="w-full max-w-md px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-sm"
      />
    </div>
  );
}

export default SearchBar;
