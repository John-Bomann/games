import { Box, Table } from "@mui/material";
import React from "react";
import RefTable from "./RefTable";

const plans = [
  { Plan: "Assault", Description: "Do violence to a target.", Detail: "The point of attack." },
  {
    Plan: "Deception",
    Description: "Lure, trick, or manipulate.",
    Detail: "The method of deception.",
  },
  { Plan: "Stealth", Description: "Trespass unseen.", Detail: "The point of infiltration." },
  { Plan: "Occult", Description: "Engage a supernatural power.", Detail: "The arcane method." },
  {
    Plan: "Social",
    Description: "Negotiate, bargain, or persuade.",
    Detail: "The social connection.",
  },
  {
    Plan: "Transport",
    Description: "Carry cargo or people through danger.",
    Detail: "The route and means.",
  },
];

export const Plan = () => {
  return <Table></Table>;
};

export default function Score() {
  return (
    <Box>
      <RefTable table={plans} />
    </Box>
  );
}
