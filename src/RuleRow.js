import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";

import "./RuleRow.css";

function RuleRow({ score, name, doScore, description }) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const disabled = score !== undefined;

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={`RuleRow RuleRow-${disabled ? "disabled" : "active"}`}
      onClick={disabled ? null : doScore}
    >
      <Grid
        item
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{
          width: "80vw",
          marginBlockEnd: "5px",
        }}
      >
        <td
          style={{
            display: "flex",
          }}
        >
          <Grid item xs={6}>
            <p
              style={{
                textAlign: "left",
                fontSize: matchesSM ? "14px" : " 18px",
              }}
            >
              {name}
            </p>
          </Grid>
          <Grid item xs={6}>
            <p
              style={{
                textAlign: "right",
                fontSize: matchesSM ? "14px" : " 18px",
              }}
            >
              {disabled ? score : description}
            </p>
          </Grid>
        </td>
      </Grid>
    </Grid>
  );
}

export default RuleRow;
