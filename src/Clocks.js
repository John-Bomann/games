import { Grid, Typography } from "@mui/material";
import React from "react";
import Clock from "./Clock";

export default function Clocks() {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Clock segments={6} name="Alert" />
        </Grid>
        <Grid item xs={3}>
          <Clock segments={8} name="Make Flamethrower" />
        </Grid>
        <Grid item xs={3}>
          <Clock segments={4} name="Angery Boss Man" />
        </Grid>
      </Grid>
    </div>
  );
}
