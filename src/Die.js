import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./Die.css";

const numberWords = ["one", "two", "three", "four", "five", "six"];

function Die({ locked, val, handleDieClick, idx, disabled, dieRoll }) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRollClick = (evt) => {
    handleDieClick(idx);
  };

  let classes = matchesSM
    ? `Die fas fa-dice-${numberWords[val - 1]} fa-3x `
    : `Die fas fa-dice-${numberWords[val - 1]} fa-5x `;
  if (locked) classes += "Die-locked";
  if (dieRoll) classes += "Die-rolling";

  return (
    <i
      className={classes}
      onClick={handleRollClick}
      disabled={disabled}
      style={{
        padding: matchesSM ? "2px" : "4px",
        margin: "1rem",
      }}
    />
  );
}

export default Die;
