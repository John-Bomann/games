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
  const [segments, setSegments] = useState("4");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSegmentChange = (e) => {
    setSegments(e.target.value);
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl">
      <DialogTitle>New Clock</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField value={name} onChange={handleNameChange} label="Name" sx={{ my: 2 }} />
        <TextField select value={segments} onChange={handleSegmentChange} label="Segments">
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={8}>8</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={() => handleNewConfirm(name, segments)}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
