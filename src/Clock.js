import React, { useEffect, useState } from "react";

import { Box, IconButton, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Slice from "./Slice";
import { Delete } from "@mui/icons-material";

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
  handleDelete,
}) {
  const angle = 360 / segments;
  const [hovered, setHovered] = useState();
  const [edit, setEdit] = useState(false);
  const [clockName, setClockName] = useState(name);

  const handleMouseOver = (num) => () => setHovered(num);
  const handleMouseOut = () => setHovered();

  const changeName = (e) => {
    handleNameChange(id, e.target.value);
  };

  const handleBlur = () => {
    setEdit(false);
  };
  console.log(edit);
  return (
    <Box display="flex">
      <Box display="flex" flexDirection="column" alignItems="center">
        {edit ? (
          <TextField value={name} onChange={changeName} onBlur={handleBlur} variant="standard" />
        ) : (
          <Typography
            variant="h5"
            fontWeight={600}
            onClick={() => setEdit(true)}
            sx={{ cursor: "pointer" }}>
            {name}
          </Typography>
        )}
        <Wrapper>
          {Array(segments)
            .fill()
            .map((el, idx) => (
              <li key={id + "" + idx}>
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
      <Box alignSelf="flex-end">
        <IconButton onClick={() => handleDelete(id)}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
}
