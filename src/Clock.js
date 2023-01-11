import React, { useState } from "react";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Slice from "./Slice";

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

export default function Clock({ segments, name }) {
  const angle = 360 / segments;
  const [hovered, setHovered] = useState();
  const [slices, setSlices] = useState(() =>
    Array(segments)
      .fill()
      .map((el, idx) => ({ filled: false, degree: angle * idx }))
  );

  const handleClick = (num) => () => {
    if (slices[num].filled) {
      setSlices((prevState) => prevState.map((slice, idx) => ({ ...slice, filled: num > idx })));
    } else {
      setSlices((prevState) => prevState.map((slice, idx) => ({ ...slice, filled: num >= idx })));
    }
  };

  const handleMouseOver = (num) => () => {
    setHovered(num);
  };
  const handleMouseOut = () => {
    setHovered();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5" fontWeight={600}>
        {name}
      </Typography>
      <Wrapper>
        {slices.map((slice, idx) => (
          <li key={slice.degree}>
            <Slice
              num={idx}
              degree={slice.degree}
              angle={angle}
              handleClick={handleClick}
              filled={slice.filled}
              hovered={idx <= hovered}
              handleMouseOver={handleMouseOver(idx)}
              handleMouseOut={handleMouseOut}
            />
          </li>
        ))}
      </Wrapper>
    </Box>
  );
}
