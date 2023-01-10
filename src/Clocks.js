import { Typography } from "@mui/material";
import React from "react";
import Clock from "./Clock";

export default function Clocks() {
  return (
    <div>
      <Typography variant="h4">Here's some clocks</Typography>
      <Clock segments={6} />
    </div>
  );
}
