import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Srd from "./Srd";
import ReferenceCard from "./ReferenceCard";
import Score from "./score";
import Loading from "../Loading";

// function Heading({ children, level }) {
//   const text = children.reduce(reduceTextChildren, []).join(" ");
//   const slug = text
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^a-z-]/g, "");

//   return React.createElement(`h${level}`, { id: slug }, children);
// }

export default function Reference() {
  let [md, setMd] = useState();

  // useEffect(() => {
  //   fetch(everything)
  //     .then((response) => response.text())
  //     .then((text) => setMd(text));
  // }, []);

  return (
    <Container p={4} sx={{ textAlign: "left" }}>
      <Srd />
    </Container>
  );
}
