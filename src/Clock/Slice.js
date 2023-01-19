import React from "react";
import { Box } from "@mui/material";
import { purple } from "@mui/material/colors";

export default function Slice({
  id,
  num,
  segments,
  filled,
  handleClick,
  hovered,
  handleMouseOut,
  handleMouseOver,
}) {
  const angle = 360 / segments;
  const degree = angle * (num - 1);
  if (id === 1674165227168) {
    console.log(num);
  }
  return (
    <Box
      onClick={() => handleClick(id, num)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
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
        background: filled ? purple["700"] : hovered ? purple["300"] : "white",
        border: filled ? "2px solid white" : `2px solid ${purple["700"]}`,
      }}
    />
  );
}
