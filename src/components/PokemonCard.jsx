import React, { useState } from "react";
import { Link } from "react-router-dom";

function PokemonCard(props) {
  const [typeArr, setTypeArr] = useState(props.types);

  return (
    <>
      <Link to={`/pokemon/${props.name}`}>
        <div className="">
          <img src={props.img} alt={`${props.name} image`} />
          <div className="description">
            <p>{props.name}</p>
            <div className="types flex gap-2">
              {typeArr.map((c) => (
                <p key={c.slot}>{c.type.name}</p>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PokemonCard;
