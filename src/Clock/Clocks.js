import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import request, { gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import Clock from "./Clock";
import NewClock from "./NewClock";
import { GRAPHQL_ENDPOINT } from "../constants";
import { useContext } from "react";
import { UserContext } from "../userContext";

export default function Clocks() {
  const [clocks, setClocks] = useState([]);
  const [clockEditorOpen, setClockEditorOpen] = useState(false);
  const { user } = useContext(UserContext);

  const getClocksQuery = gql`
    query {
      clocks(sortBy: ORDER_ASC) {
        _id
        filled
        name
        segments
        type
        row
        order
      }
    }
  `;

  const headers = { Authorization: `Bearer ${user._accessToken}` };
  const getClocks = async () => {
    const response = await request(GRAPHQL_ENDPOINT, getClocksQuery, {}, headers);
    setClocks(response.clocks);
  };
  useEffect(() => {
    getClocks();
  }, []);

  // slice is the 1-indexed location of the clicked slice
  const handleSliceClick = (id, slice) => {
    setClocks(
      clocks.map((clock) => {
        if (clock._id === id) {
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

  const handleClockChange = (name, id, value) => {
    setClocks(
      clocks.map((clock) => {
        if (clock._id === id) {
          return { ...clock, [name]: value };
        } else {
          return clock;
        }
      })
    );
  };

  const createClockQuery = gql`
    mutation AddClock($data: ClockInsertInput!) {
      insertOneClock(data: $data) {
        _id
        name
        segments
        type
        filled
        order
        row
      }
    }
  `;

  const handleNewConfirm = async (name, segments, row) => {
    const response = await request(
      GRAPHQL_ENDPOINT,
      createClockQuery,
      { data: { name, segments, type: "good", filled: 0, order: clocks.length + 1, row } },
      headers
    );

    setClocks((prevState) => [...prevState, response.insertOneClock]);
    setClockEditorOpen(false);
  };

  const deleteClockQuery = gql`
    mutation ($query: ClockQueryInput!) {
      deleteOneClock(query: $query) {
        _id
      }
    }
  `;

  const handleDelete = async (_id) => {
    setClocks((prevState) => prevState.filter((clock) => clock._id !== _id));
    await request(GRAPHQL_ENDPOINT, deleteClockQuery, { query: { _id } }, headers);
  };

  const row1 = clocks.filter((clock) => clock.row === 1);
  const row2 = clocks.filter((clock) => clock.row === 2);

  return (
    <Box m={2}>
      <Box mb={3}>
        <Typography variant="h4" textAlign="left" ml={6} gutterBottom>
          Short Term
        </Typography>
        <Grid container spacing={1} alignItems="start">
          {row1.map((clock) => (
            <Grid key={clock._id} item xs={3}>
              <Clock
                {...clock}
                handleSliceClick={handleSliceClick}
                handleClockChange={handleClockChange}
                handleDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box justifyContent="start">
        <Typography variant="h4" textAlign="left" ml={6} gutterBottom>
          Long Term
        </Typography>
        <Grid container spacing={1} alignItems="start">
          {row2.map((clock) => (
            <Grid key={clock._id} item xs={3}>
              <Clock
                {...clock}
                handleSliceClick={handleSliceClick}
                handleClockChange={handleClockChange}
                handleDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <NewClock
        open={clockEditorOpen}
        handleClose={() => setClockEditorOpen(false)}
        handleOpen={() => setClockEditorOpen(true)}
        handleNewConfirm={handleNewConfirm}
      />
    </Box>
  );
}
