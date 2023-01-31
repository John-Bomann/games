import React, { useContext, useEffect, useState } from "react";

import { Box, IconButton, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Slice from "./Slice";
import { Delete, Numbers } from "@mui/icons-material";
import Dropdown from "./Dropdown";
import request, { gql } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../constants";
import { UserContext } from "../userContext";
import { useCallback } from "react";
import debounce from "lodash/debounce";
import { useRef } from "react";

const Wrapper = styled("ul")({
  position: "relative",
  border: "1px solid black",
  padding: 0,
  marginTop: 4,
  width: 200,
  height: 200,
  borderRadius: "50%",
  listStyle: "none",
  overflow: "hidden",
});

export default function Clock({
  _id,
  filled,
  segments,
  type,
  name,
  order,
  handleSliceClick,
  handleClockChange,
  handleDelete,
}) {
  const [hovered, setHovered] = useState();
  const [edit, setEdit] = useState(false);
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState();
  const isMounted = useRef(false);

  const editClockQuery = gql`
    mutation ($query: ClockQueryInput, $set: ClockUpdateInput!) {
      updateOneClock(query: $query, set: $set) {
        _id
      }
    }
  `;
  const editClockVars = {
    query: {
      _id: _id,
    },
    set: {
      filled,
      name,
      segments,
      type,
      order,
    },
  };
  const headers = { Authorization: `Bearer ${user._accessToken}` };
  const updateClocks = async (vars) => {
    await request(GRAPHQL_ENDPOINT, editClockQuery, vars, headers);
  };

  const saveChanges = useCallback(
    debounce((vars) => {
      if (isMounted.current) {
        updateClocks(vars);
      }
      isMounted.current = true;
    }, 500),
    []
  );
  useEffect(() => {
    saveChanges(editClockVars);
  }, [_id, filled, segments, type, name]);

  const handleMouseOver = (num) => () => setHovered(num);
  const handleMouseOut = () => setHovered();

  const changeName = (e) => {
    handleClockChange("name", _id, e.target.value);
  };

  const handleBlur = () => {
    setEdit(false);
  };

  const keyDown = (e) => {
    if (e.keyCode === 13) {
      setEdit(false);
    }
  };
  const handleNumClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleNumItemClick = (num) => () => {
    if (num < filled) {
      handleSliceClick(_id, num);
    }
    handleClockChange("segments", _id, num);
    setAnchorEl();
  };

  return (
    <Box display="flex" justifyContent="center" width="100%" height="100%" flex={0.25}>
      <Box display="flex" flexDirection="column" alignItems="center">
        {edit ? (
          <TextField
            value={name}
            onChange={changeName}
            onBlur={handleBlur}
            onKeyDown={keyDown}
            variant="standard"
            autoFocus
            inputProps={{
              style: {
                fontSize: 20,
                textAlign: "center",
              },
            }}
          />
        ) : (
          <Typography
            variant="h6"
            fontWeight={600}
            onClick={() => setEdit(true)}
            width="100%"
            sx={{ cursor: "pointer", color: name ? undefined : "GrayText" }}>
            {name ? name : "Name"}
          </Typography>
        )}
        <Wrapper>
          {Array(segments)
            .fill()
            .map((el, idx) => (
              <li key={_id + idx}>
                <Slice
                  id={_id}
                  num={idx + 1}
                  filled={filled >= idx + 1}
                  segments={segments}
                  hovered={idx <= hovered}
                  handleClick={handleSliceClick}
                  handleMouseOver={handleMouseOver(idx)}
                  handleMouseOut={handleMouseOut}
                />
              </li>
            ))}
        </Wrapper>
      </Box>
      <Box display="flex" alignSelf="flex-end" flexDirection="column">
        <IconButton onClick={handleNumClick}>
          <Numbers />
        </IconButton>
        <IconButton onClick={() => handleDelete(_id)}>
          <Delete />
        </IconButton>
      </Box>
      <Dropdown
        anchorEl={anchorEl}
        handleClose={() => setAnchorEl()}
        handleClick={handleNumItemClick}
        segments={segments}
      />
    </Box>
  );
}
