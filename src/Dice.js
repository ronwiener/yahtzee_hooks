import React from "react";
import Die from "./Die";
import "./Dice.css";

function Dice({ dice, handleClick, locked, disabled, rolling }) {
  return (
    <div className="Dice">
      {dice.map((d, idx) => (
        <Die
          handleDieClick={handleClick}
          val={d}
          locked={locked[idx]}
          idx={idx}
          key={idx}
          disabled={disabled}
          dieRoll={rolling && !locked[idx]}
        />
      ))}
    </div>
  );
}

export default Dice;
