import React, { useState } from "react";

function PokemonCard(props) {
  const [typeArr, setTypeArr] = useState(props.types);

  return (
    <>
      <div className="">
        <img src={props.img} alt={`${props.name} image`} />
        <div className="description">
          <p>{props.name}</p>
          <div className="types flex gap-2">
            {
                typeArr.map(c=>(
                   <p>{c.type.name}</p> 
                ))
            }
            </div>
        </div>
      </div>
    </>
  );
}

export default PokemonCard;
