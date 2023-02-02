import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReferenceCard from "./ReferenceCard";

export default function Reference() {
  // Expandable Cards
  // Grid
  return (
    <Box p={4}>
      <Grid container spacing={1}>
        <Grid item xs={6} md={4} xl={3}>
          <ReferenceCard />
        </Grid>
      </Grid>
    </Box>
  );
}
