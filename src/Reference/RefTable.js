import { Paper, Table, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

export default function RefTable({ table }) {
  const columns = Object.keys(table[0]);
  return (
    <Table component={Paper}>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column} sx={{ fontWeight: "bold" }}>
              {column}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      {table.map((row, idx) => (
        <TableRow key={idx + row[columns[0]]}>
          {columns.map((column) => (
            <TableCell key={row[column]}>{row[column]}</TableCell>
          ))}
        </TableRow>
      ))}
    </Table>
  );
}
