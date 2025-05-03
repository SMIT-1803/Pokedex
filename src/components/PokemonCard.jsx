import React, { useState } from "react";
import { Link } from "react-router-dom";

function PokemonCard({ name, img, types }) {
  return (
    <Link to={`/pokemon/${name}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 flex flex-col items-center justify-between w-64 mx-auto ring-1 ring-gray-200 hover:ring-2 hover:ring-indigo-400">
        <div className="w-32 h-32 mb-4">
          <img
            src={img}
            alt={`${name} image`}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center">
          <p className="text-xl font-bold uppercase text-gray-800 mb-2">
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;
