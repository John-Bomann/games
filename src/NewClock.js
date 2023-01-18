import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export default function NewClock({ open, handleClose, handleNewConfirm }) {
  const [name, setName] = useState("");
  const [segments, setSegments] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSegmentChange = (e) => {
    console.log(e.target.value);
    setSegments(e.target.value);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New Clock</DialogTitle>
      <DialogContent>
        <TextField value={name} onChange={handleNameChange} />
        <TextField select value={segments} onChange={handleSegmentChange}>
          <MenuItem>4</MenuItem>
          <MenuItem>6</MenuItem>
          <MenuItem>8</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => handleNewConfirm(name, segments)}>
          Confirm
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
