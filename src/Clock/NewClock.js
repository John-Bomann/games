import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export default function NewClock({ open, handleClose, handleOpen, handleNewConfirm }) {
  const [name, setName] = useState("");
  const [segments, setSegments] = useState("4");
  const [row, setRow] = useState("1");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSegmentChange = (e) => {
    setSegments(e.target.value);
  };
  const handleRowChange = (e) => {
    setRow(e.target.value);
  };
  const handleClick = () => {
    setName("");
    setSegments("4");
    handleNewConfirm(name, segments, row);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        TransitionProps={{ unmountOnExit: true }}>
        <DialogTitle>New Clock</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <Stack spacing={2}>
            <TextField
              autoFocus
              value={name}
              onChange={handleNameChange}
              label="Name"
              sx={{ mt: 1 }}
            />
            <TextField select value={segments} onChange={handleSegmentChange} label="Segments">
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={8}>8</MenuItem>
            </TextField>
            <TextField select value={row} onChange={handleRowChange} label="Row">
              <MenuItem value={1}>Short Term</MenuItem>
              <MenuItem value={2}>Long Term</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClick}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Fab color="primary" onClick={handleOpen} sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <Add />
      </Fab>
    </div>
  );
}
