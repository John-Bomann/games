import React from "react";
import { Box } from "@mui/material";
import { purple } from "@mui/material/colors";

export default function Slice({
  num,
  degree,
  angle,
  filled,
  handleClick,
  hovered,
  handleMouseOut,
  handleMouseOver,
}) {
  return (
    <Box
      onClick={handleClick(num)}
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
