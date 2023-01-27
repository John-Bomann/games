import { Box, Button, Grid, Typography } from "@mui/material";
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
      clocks(sortBy: ORDER_DESC) {
        _id
        filled
        name
        segments
        type
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
  const handleNameChange = (id, name) => {
    setClocks(
      clocks.map((clock) => {
        if (clock._id === id) {
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
        if (clock._id === id) {
          return { ...clock, segments };
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
      }
    }
  `;
  // const
  const handleNewConfirm = async (name, segments) => {
    const response = await request(
      GRAPHQL_ENDPOINT,
      createClockQuery,
      { data: { name, segments, type: "good", filled: 0, order: clocks.length + 1, row: 1 } },
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

  return (
    <Box my={2}>
      <Grid container spacing={1}>
        {clocks.map((clock) => (
          <Grid item xs={3} key={clock._id}>
            <Clock
              {...clock}
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
        handleOpen={() => setClockEditorOpen(true)}
        handleNewConfirm={handleNewConfirm}
      />
    </Box>
  );
}
