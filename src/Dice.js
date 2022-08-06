import React from "react";
import Die from "./Die";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function Dice({ dice, handleClick, locked, disabled, rolling }) {
  return (
    <Container

    //className="Dice"
    >
      <Grid container="row">
        {dice.map((d, idx) => (
          <Grid item xs={2.4} key={idx}>
            <Die
              handleDieClick={handleClick}
              val={d}
              locked={locked[idx]}
              idx={idx}
              key={idx}
              disabled={disabled}
              dieRoll={rolling && !locked[idx]}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dice;
