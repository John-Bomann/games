import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import request, { gql } from "graphql-request";
import React, { useEffect, useState } from "react";
import Clock from "./Clock";
import NewClock from "./NewClock";
import { GRAPHQL_ENDPOINT } from "../constants";
import { useContext } from "react";
import { UserContext } from "../userContext";
import Loading from "../Loading";

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

  const handleNewConfirm = async (name, segments, row, type) => {
    const response = await request(
      GRAPHQL_ENDPOINT,
      createClockQuery,
      { data: { name, segments, type, filled: 0, order: clocks.length + 1, row } },
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
  const rows = [
    { data: row1, title: "Short Term" },
    { data: row2, title: "Long Term" },
  ];

  if (clocks.length === 0) {
    return <Loading />;
  }

  return (
    <Box p={4} component={Paper} minHeight="calc(100vh - 64px)">
      {rows.map((row, idx) => (
        <Box key={row.title} mb={idx === 0 && 5} minHeight="150px">
          <Typography variant="h4" textAlign="left" gutterBottom>
            {row.title}
          </Typography>
          <Grid container spacing={2} alignItems="start">
            {row.data.map((clock) => (
              <Grid key={clock._id} item xs={12} sm={6} md={4} lg={3}>
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
      ))}
      <NewClock
        open={clockEditorOpen}
        handleClose={() => setClockEditorOpen(false)}
        handleOpen={() => setClockEditorOpen(true)}
        handleNewConfirm={handleNewConfirm}
      />
    </Box>
  );
}
