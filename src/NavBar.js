import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function NavBar() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6">John's Stuff</Typography>
      </Toolbar>
    </AppBar>
  );
}
