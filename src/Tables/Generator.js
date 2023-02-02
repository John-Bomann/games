import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { rollTable } from "./helpers";
import TableDialog from "./TableDialog";

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

export default function Generator({ tables, name, order }) {
  const [results, setResults] = useState([]);
  const [collapseIn, setCollapseIn] = useState(false);
  // "display" or "buttons"
  const [view, setView] = useState("display");
  const [tableOpen, setTableOpen] = useState(false);
  const [dialogTable, setDialogTable] = useState(null);

  const handleTableClick = (table) => () => {
    setDialogTable(table);
    setTableOpen(true);
  };
  const handleTableDialogClose = () => {
    setDialogTable(null);
    setTableOpen(false);
  };

  const switchView = () => {
    const newView = view === "display" ? "buttons" : "display";
    setView(newView);
    if (newView === "buttons") {
      setCollapseIn(true);
    } else {
      setCollapseIn(Boolean(results));
    }
  };

  // Order tables
  tables = (() => {
    const result = [];
    order.forEach((tableName) => {
      const table = tables.find((table) => table.name === tableName);
      if (table) {
        result.push(table);
      }
    });
    return result;
  })();

  const rollTables = () => {
    setResults(tables.map((table) => ({ ...table, result: rollTable(table) })));
    setCollapseIn(true);
  };

  const displayView = results.map((table) => (
    <Grid key={table._id} item xs={6} md={results.length === 2 ? 6 : 4}>
      <Typography variant="h6" textAlign="start" sx={{ pr: 1 }}>
        {table.title}:
      </Typography>
      <Typography variant="h6" color="secondary.light" textAlign="start" fontSize="1rem">
        {table.result}
      </Typography>
    </Grid>
  ));

  const getPluralTitle = (title) => {
    if (title[title.length - 1] === "s") {
      return (title += "es");
    } else {
      return (title += "s");
    }
  };

  const buttonView = tables.map((table) => (
    <Grid key={table._id} item xs={6} md={4}>
      <Button onClick={handleTableClick(table)} variant="outlined" sx={{ width: "100%" }}>
        {getPluralTitle(table.title)}
      </Button>
    </Grid>
  ));

  // ADD NAME TABLE FOR BUILDINGS

  return (
    <Card>
      <CardHeader title={name} />
      <Collapse in={collapseIn} timeout="auto">
        <CardContent>
          <Grid container spacing={1}>
            {view === "display" ? displayView : buttonView}
          </Grid>
        </CardContent>
      </Collapse>
      <CardActions>
        <Button
          onClick={switchView}
          sx={{ flex: 0.2 }}
          variant={view === "display" ? "outlined" : "contained"}>
          Switch View
        </Button>
        <Button
          variant="contained"
          onClick={rollTables}
          disabled={view === "buttons"}
          sx={{ width: "50%", mx: "auto", my: 1, flex: 0.8 }}>
          Generate
        </Button>
        <Button
          variant="outlined"
          onClick={() => setCollapseIn(false)}
          disabled={view === "buttons"}
          sx={{ flex: 0.2, boxSizing: "content-box" }}>
          Clear
        </Button>
      </CardActions>
      {dialogTable && (
        <TableDialog open={tableOpen} handleClose={handleTableDialogClose} table={dialogTable} />
      )}
    </Card>
  );
}
