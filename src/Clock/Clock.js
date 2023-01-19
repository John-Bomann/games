import React, { useEffect, useState } from "react";

import { Box, IconButton, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Slice from "./Slice";
import { Delete, Numbers } from "@mui/icons-material";
import Dropdown from "./Dropdown";

const Wrapper = styled("ul")({
  position: "relative",
  border: "1px solid black",
  padding: 0,
  width: 200,
  height: 200,
  borderRadius: "50%",
  listStyle: "none",
  overflow: "hidden",
});

export default function Clock({
  id,
  filled,
  segments,
  name,
  handleSliceClick,
  handleNameChange,
  handleSegmentChange,
  handleDelete,
}) {
  const angle = 360 / segments;
  const [hovered, setHovered] = useState();
  const [edit, setEdit] = useState(false);
  const [clockName, setClockName] = useState(name);
  const [anchorEl, setAnchorEl] = useState();

  const handleMouseOver = (num) => () => setHovered(num);
  const handleMouseOut = () => setHovered();

  const changeName = (e) => {
    handleNameChange(id, e.target.value);
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
      handleSliceClick(id, num);
    }
    handleSegmentChange(id, num);
    setAnchorEl();
  };

  return (
    <Box display="flex" justifyContent="center" width="100%" height="100%">
      <Box display="flex" flexDirection="column" alignItems="center">
        {edit ? (
          <TextField
            value={name}
            onChange={changeName}
            onBlur={handleBlur}
            onKeyDown={keyDown}
            variant="standard"
            autoFocus
          />
        ) : (
          <Typography
            variant="h5"
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
              <li key={idx}>
                <Slice
                  id={id}
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
        <IconButton onClick={() => handleDelete(id)}>
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
