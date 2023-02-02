import React from "react";
import { Box, useTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

export default function Slice({
  id,
  num,
  type,
  segments,
  filled,
  handleClick,
  hovered,
  handleMouseOut,
  handleMouseOver,
}) {
  const angle = 360 / segments;
  const degree = angle * (num - 1);
  const theme = useTheme();
  const typeColor = type === "good" ? theme.palette.secondary : theme.palette.tertiary;
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
        background: filled ? typeColor.main : hovered ? typeColor.light : "#313131",
        border: "2px solid white",
        // border: filled ? "2px solid white" : `2px solid ${purple["700"]}`,
      }}
    />
  );
}
