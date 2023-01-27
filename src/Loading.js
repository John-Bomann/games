import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Loading() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="100vh">
      <CircularProgress disableShrink size="10rem" />
    </Box>
  );
}
