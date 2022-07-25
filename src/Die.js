import React, { Component } from "react";
import "./Die.css";

const numberWords = ["one", "two", "three", "four", "five", "six"];

function Die({ locked, val, handleDieClick, idx, disabled, dieRoll }) {
  const handleRollClick = (evt) => {
    handleDieClick(idx);
  };

  let classes = `Die fas fa-dice-${numberWords[val - 1]} fa-5x `;
  if (locked) classes += "Die-locked";
  if (dieRoll) classes += "Die-rolling";

  return (
    <i className={classes} onClick={handleRollClick} disabled={disabled} />
  );
}

export default Die;
