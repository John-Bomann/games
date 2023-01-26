import { Box, Button, Grid, Typography } from "@mui/material";
import request, { gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import Clock from "./Clock";
import NewClock from "./NewClock";
import { GRAPHQL_ENDPOINT } from "../constants";

export default function Clocks() {
  const [clocks, setClocks] = useState([
    { id: 1, segments: 6, name: "Alert", filled: 3 },
    { id: 2, segments: 8, name: "Make Flamethrower", filled: 0 },
    { id: 3, segments: 4, name: "Angery Boss Man", filled: 0 },
  ]);
  const [clockEditorOpen, setClockEditorOpen] = useState(false);

  const getClocksQuery = gql`
  query getClocks {
    clock() {
      _id
      filled
      name
      segments
      type
    }
  }
  `;
  // const headers =
  const getClocks = async () => {
    const response = await request(GRAPHQL_ENDPOINT);
    console.log(response);
    setClocks(response);
  };
  useEffect(() => {
    const clocksResponse = getClocks();
  }, []);

  // slice is the 1-indexed location of the clicked slice
  const handleSliceClick = (id, slice) => {
    setClocks(
      clocks.map((clock) => {
        if (clock.id === id) {
          if (slice > clock.filled) {
            return { ...clock, filled: slice };
          } else {
            return { ...clock, filled: slice - 1 };
          }
        } else {
          return clock;
        }
      })
    );
  };
  const handleNameChange = (id, name) => {
    setClocks(
      clocks.map((clock) => {
        if (clock.id === id) {
          return { ...clock, name };
        } else {
          return clock;
        }
      })
    );
  };
  const handleSegmentChange = (id, segments) => {
    setClocks(
      clocks.map((clock) => {
        if (clock.id === id) {
          return { ...clock, segments };
        } else {
          return clock;
        }
      })
    );
  };

  const handleNewConfirm = (name, segments) => {
    setClocks((prevState) => [
      ...prevState,
      { id: Date.now(), segments: parseInt(segments), name, filled: 0 },
    ]);
    setClockEditorOpen(false);
  };

  const handleDelete = (id) => {
    setClocks((prevState) => prevState.filter((clock) => clock.id !== id));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button variant="contained" size="large" onClick={() => setClockEditorOpen(true)}>
          Add Clock
        </Button>
      </Box>
      <Grid container spacing={1}>
        {clocks.map((clock) => (
          <Grid item xs={3} key={clock.id}>
            <Clock
              segments={clock.segments}
              name={clock.name}
              filled={clock.filled}
              id={clock.id}
              handleSliceClick={handleSliceClick}
              handleNameChange={handleNameChange}
              handleSegmentChange={handleSegmentChange}
              handleDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
      <NewClock
        open={clockEditorOpen}
        handleClose={() => setClockEditorOpen(false)}
        handleNewConfirm={handleNewConfirm}
      />
    </Box>
  );
}
