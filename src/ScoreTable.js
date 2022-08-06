import React, { useState, useEffect } from "react";
import RuleRow from "./RuleRow";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance,
} from "./Rules";

function ScoreTable({ scores, doScore, gameOver }) {
  const [highScore, setHighScore] = useState(0);
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  function getTotalScore() {
    let totalScore = 0;
    for (let key in scores) {
      if (scores[key]) totalScore += scores[key];
    }
    if (totalScore > highScore) {
      setHighScore(totalScore);
      const json = JSON.stringify(totalScore);

      localStorage.setItem("highScore", json);
    }

    return totalScore;
  }

  useEffect(() => {
    const json = localStorage.getItem("highScore");
    const savedScore = JSON.parse(json);
    if (savedScore) {
      setHighScore(savedScore);
    }
  }, []);

  return (
    <Container>
      <Grid item>
        <h2
          style={{
            color: "red",
            fontSize: matchesSM ? "20px" : "h2",
            padding: matchesSM ? "4px" : "8px",
          }}
        >
          Upper
        </h2>
      </Grid>
      <Grid container direction="row" justifyContent="center">
        <RuleRow
          name="Ones"
          score={scores.ones}
          description={ones.description}
          doScore={(evt) => doScore("ones", ones.evalRoll)}
        />

        <RuleRow
          name="Twos"
          score={scores.twos}
          description={twos.description}
          doScore={(evt) => doScore("twos", twos.evalRoll)}
        />

        <RuleRow
          name="Threes"
          score={scores.threes}
          description={threes.description}
          doScore={(evt) => doScore("threes", threes.evalRoll)}
        />

        <RuleRow
          name="Fours"
          score={scores.fours}
          description={fours.description}
          doScore={(evt) => doScore("fours", fours.evalRoll)}
        />

        <RuleRow
          name="Fives"
          score={scores.fives}
          description={fives.description}
          doScore={(evt) => doScore("fives", fives.evalRoll)}
        />

        <RuleRow
          name="Sixes"
          score={scores.sixes}
          description={sixes.description}
          doScore={(evt) => doScore("sixes", sixes.evalRoll)}
        />
      </Grid>
      <Grid item>
        <h2
          style={{
            color: "red",
            fontSize: matchesSM ? "20px" : "h2",
            padding: matchesSM ? "4px" : "8px",
          }}
        >
          Lower
        </h2>
      </Grid>
      <Grid container direction="row" justifyContent="center">
        <RuleRow
          name="Three of Kind"
          score={scores.threeOfKind}
          description={threeOfKind.description}
          doScore={(evt) => doScore("threeOfKind", threeOfKind.evalRoll)}
        />

        <RuleRow
          name="Four of Kind"
          score={scores.fourOfKind}
          description={fourOfKind.description}
          doScore={(evt) => doScore("fourOfKind", fourOfKind.evalRoll)}
        />

        <RuleRow
          name="Full House"
          score={scores.fullHouse}
          description={fullHouse.description}
          doScore={(evt) => doScore("fullHouse", fullHouse.evalRoll)}
        />

        <RuleRow
          name="Small Straight"
          score={scores.smallStraight}
          description={smallStraight.description}
          doScore={(evt) => doScore("smallStraight", smallStraight.evalRoll)}
        />

        <RuleRow
          name="Large Straight"
          score={scores.largeStraight}
          description={largeStraight.description}
          doScore={(evt) => doScore("largeStraight", largeStraight.evalRoll)}
        />

        <RuleRow
          name="Yahtzee"
          score={scores.yahtzee}
          description={yahtzee.description}
          doScore={(evt) => doScore("yahtzee", yahtzee.evalRoll)}
        />

        <RuleRow
          name="Chance"
          score={scores.chance}
          description={chance.description}
          doScore={(evt) => doScore("chance", chance.evalRoll)}
        />
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-end"
      >
        <Grid item>
          <h2
            style={{
              color: "red",
              fontSize: matchesSM ? "20px" : "h2",
              padding: matchesSM ? "4px" : "8px",
            }}
          >
            TOTAL SCORE: {getTotalScore()}
          </h2>
        </Grid>
        <Grid item>
          {gameOver ? (
            <h3
              style={{
                color: "red",
                fontSize: matchesSM ? "20px" : "h2",
                padding: matchesSM ? "4px" : "8px",
              }}
            >
              Your highest score: {highScore}
            </h3>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
}
export default ScoreTable;
