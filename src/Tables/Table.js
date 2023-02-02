import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { rollTable } from "./helpers";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Table({ table }) {
  const [result, setResult] = useState("");
  // View full list function
  // Cards?
  const getResult = () => {
    setResult(rollTable(table));
  };

  return (
    <Card>
      <CardHeader title={table.title} subheader={table.description} />
      {result && (
        <CardContent>
          <Typography variant="h6" color="secondary.main">
            {result}
          </Typography>
        </CardContent>
      )}
      <CardActions>
        <Button sx={{ flex: 0.2 }} />
        <Button
          variant="contained"
          onClick={getResult}
          sx={{ width: "50%", mx: "auto", my: 1, flex: 0.8 }}>
          Generate
        </Button>
        <Button
          variant="outlined"
          onClick={() => setResult("")}
          sx={{ flex: 0.2, boxSizing: "content-box" }}>
          Clear
        </Button>
      </CardActions>
    </Card>
  );
}
