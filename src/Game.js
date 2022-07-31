import React, { useState } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./Game.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

function Game() {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [gameState, setGameState] = useState({
    dice: Array.from({ length: NUM_DICE }),
    locked: Array(NUM_DICE).fill(false),
    rollsLeft: NUM_ROLLS,
    isRolling: false,
    scores: {
      ones: undefined,
      twos: undefined,
      threes: undefined,
      fours: undefined,
      fives: undefined,
      sixes: undefined,
      threeOfKind: undefined,
      fourOfKind: undefined,
      fullHouse: undefined,
      smallStraight: undefined,
      largeStraight: undefined,
      yahtzee: undefined,
      chance: undefined,
    },
  });

  const reset = () => {
    setGameState({
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      isRolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
      },
    });
  };

  function roll(evt) {
    // roll dice whose indexes are in reroll
    setGameState((gs) => ({
      ...gameState,
      dice: gs.dice.map((d, idx) =>
        gs.locked[idx] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: gs.rollsLeft > 1 ? gs.locked : Array(NUM_DICE).fill(true),
      rollsLeft: gs.rollsLeft > 0 ? gs.rollsLeft - 1 : 0,
      isRolling: false,
    }));
  }

  function animateRoll() {
    setGameState(() => ({
      ...gameState,
      isRolling: true,
    }));
    setTimeout(roll, 500);
  }

  function toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if (gameState.rollsLeft > 0 && !gameState.isRolling) {
      setGameState((gs) => ({
        ...gameState,
        locked: [
          ...gs.locked.slice(0, idx),
          !gs.locked[idx],
          ...gs.locked.slice(idx + 1),
        ],
      }));
    }
  }

  function doScore(ruleName, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    setGameState((gs) => ({
      ...gameState,
      scores: { ...gs.scores, [ruleName]: ruleFn(gameState.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }));
    // animateRoll();
  }

  function displayRollInfo() {
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Round",
    ];
    return messages[gameState.rollsLeft];
  }

  const gameOver = Object.keys(gameState.scores).every(
    (k) => gameState.scores[k] !== undefined
  );

  return (
    <Grid
      container
      direction="column"
      style={{
        width: "auto",
        background: "white",
        boxShadow:
          "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
        marginTop: "5px",
        marginBottom: "5px",
      }}
    >
      <Grid container direction="column" className="Game-header">
        <Grid item>
          <h1
            style={{
              color: "white",

              fontWeight: matchesSM ? "100" : "200",
              fontSize: matchesSM ? "1.5em" : "2.5em",
              display: "inline-block",
            }}
          >
            Play Yahtzee!
          </h1>
        </Grid>
        <Grid item>
          <h3
            style={{
              color: "white",
              fontWeight: matchesSM ? "100" : "200",
              fontSize: matchesSM ? "0.5em" : "1em",
              display: "inline-block",
            }}
          >
            By Ron's Fun & Games
          </h3>
        </Grid>

        <Grid
          item
          style={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "0",
          }}
        >
          <Dice
            dice={gameState.dice}
            locked={gameState.locked}
            handleClick={toggleLocked}
            disabled={gameState.rollsLeft === 0}
            rolling={gameState.isRolling}
          />

          <div className="Game-button-wrapper">
            <button
              size="small"
              className="Game-reroll"
              style={{
                fontSize: matchesSM ? ".75em" : "1.75em",
                color: "black",
                fontWeight: matchesSM ? "100" : "200",

                border: matchesSM ? "1px solid black" : "3px solid black",
                borderRadius: "3px",
                width: "60%",
                height: matchesSM ? "1.5rem" : "3rem",
                marginBottom: matchesSM ? "1rem" : "2rem",
              }}
              disabled={
                gameState.locked.every((x) => x) ||
                gameState.rollsLeft === 0 ||
                gameState.isRolling
              }
              onClick={animateRoll}
            >
              {gameOver ? (
                <div className="Board-title">
                  <span className="neon-orange">Game</span>
                  <span className="neon-blue">Over</span>
                </div>
              ) : (
                displayRollInfo()
              )}
            </button>
          </div>
        </Grid>
      </Grid>

      <Grid container direction="row">
        <ScoreTable doScore={doScore} scores={gameState.scores} />
      </Grid>
      <div className="Game-reset">
        <button className="resetButton" onClick={reset}>
          Reset Game
        </button>
      </div>
    </Grid>
  );
}

export default Game;
