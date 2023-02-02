import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { rollTable } from "./helpers";

export default function TableDialog({ open, handleClose, table }) {
  const [result, setResult] = useState();
  const getResult = () => {
    setResult(rollTable(table));
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ mt: 8 }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        {table.title}
        <Button onClick={getResult} variant="contained">
          Generate
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          {table.data.map((entry) => (
            <Grid key={table._id + entry} item xs={12} md={6} display="flex">
              <Paper
                elevation={4}
                sx={{ p: 1, fontSize: ".9rem", alignSelf: "stretch", width: "100%" }}>
                {entry}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      {result && (
        <Typography variant="h6" color="secondary.light" m={2}>
          {result}
        </Typography>
      )}
      {/* <DialogActions></DialogActions> */}
    </Dialog>
  );
}
