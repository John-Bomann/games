import { AppBar, Button, InputAdornment, TextField, Toolbar } from "@mui/material";
import { Search } from "@mui/icons-material";
import React, { useState } from "react";

export default function SearchBar({ search, handleSearchChange }) {
  return (
    <AppBar position="sticky">
      <Toolbar disableGutters>
        <TextField
          value={search}
          onChange={handleSearchChange}
          variant="standard"
          color="secondary"
          // margin="dense"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ ml: 1, minWidth: "30%" }}
        />
      </Toolbar>
    </AppBar>
  );
}
