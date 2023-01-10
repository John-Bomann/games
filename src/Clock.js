import { Box } from "@mui/material";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/system";
import React, { useState } from "react";

const Slice = ({ num, degree, angle, filled, handleClick }) => {
  return (
    <Box
      onClick={handleClick(num)}
      sx={{
        overflow: "hidden",
        cursor: "pointer",
        position: "absolute",
        top: "-10%",
        left: "50%",
        width: "60%",
        height: "60%",
        transformOrigin: "0% 100%",
        transform: `rotate(${degree}deg) skewY(calc(-90deg + ${angle}deg))`,
        background: filled ? purple["700"] : "white",
        border: "2px solid white",
        "&:hover": {
          background: purple["300"],
        },
      }}
    />
  );
};

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

export default function Clock({ segments }) {
  const angle = 360 / segments;
  const [slices, setSlices] = useState(() =>
    Array(segments)
      .fill()
      .map((el, idx) => ({ filled: false, degree: angle * idx }))
  );

  const handleClick = (num) => () => {
    console.log("test");
    setSlices((prevState) => prevState.map((slice, idx) => ({ ...slice, filled: num >= idx })));
  };

  return (
    <Wrapper>
      {slices.map((slice, idx) => (
        <li key={slice.degree}>
          <Slice
            num={idx}
            degree={slice.degree}
            angle={angle}
            handleClick={handleClick}
            filled={slice.filled}
          />
        </li>
      ))}
    </Wrapper>
  );
}
