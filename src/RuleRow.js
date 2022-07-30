import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";

import "./RuleRow.css";

function RuleRow({ score, name, doScore, description }) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const disabled = score !== undefined;

  return (
    <Grid
      container
      justifyContent="space-around"
      className={`RuleRow RuleRow-${disabled ? "disabled" : "active"}`}
      onClick={disabled ? null : doScore}
      style={{
        width: "70vw",
      }}
    >
      <Grid item>
        <td>
          <span
            style={{
              // marginLeft: matchesSM ? "0px" : "2px",
              fontSize: matchesSM ? "10px" : " 16px",
            }}
          >
            {name}
          </span>

          <span
            style={{
              marginLeft: matchesSM ? "20px" : matchesMD ? "100px" : "265px",
              fontSize: matchesSM ? "10px" : " 16px",
            }}
          >
            {disabled ? score : description}
          </span>
        </td>
      </Grid>
    </Grid>
  );
}

export default RuleRow;
