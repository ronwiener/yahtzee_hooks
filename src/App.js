import React from "react";
import Game from "./Game";
import Grid from "@mui/material/Grid";
import "./App.css";

function App() {
  return (
    <Grid container direction="row" className="App">
      <Game />
    </Grid>
  );
}

export default App;
