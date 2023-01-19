import { Menu, MenuItem } from "@mui/material";
import React from "react";

export default function Dropdown({ anchorEl, handleClose, handleClick, segments }) {
  const options = [4, 6, 8];
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      {options.map((num) => (
        <MenuItem selected={segments === num} onClick={handleClick(num)}>
          {num}
        </MenuItem>
      ))}
    </Menu>
  );
}
