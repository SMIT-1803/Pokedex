import React from "react";

function SearchBar(props) {
  return (
    <>
      <div className="flex justify-center items-center ">
        <input
          className="border-2 border-black"
          onChange={(e)=>{return props.pokemon(e.target.value)}}
          type="text"
          name="pokemon"
          id=""
          placeholder="Search Pokemon"
        />
      </div>
    </>
  );
}

export default SearchBar;
