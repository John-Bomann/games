import { Grid, Paper, Box } from "@mui/material";
import request, { gql } from "graphql-request";
import React, { useContext, useEffect, useState } from "react";
import { GRAPHQL_ENDPOINT } from "../constants";
import { UserContext } from "../userContext";
import Generator from "./Generator";
import { buildingOrder, cultOrder, npcOrder, scoreOrder, streetOrder } from "./orders";
import Table from "./Table";
import Loading from "../Loading";
import SearchBar from "./SearchBar";

// FEATURE: ROLL WITHOUT REPLACEMENT
export default function Tables() {
  const [tables, setTables] = useState([]);
  const [search, setSearch] = useState();
  const { user } = useContext(UserContext);

  const getTablesQuery = gql`
    query {
      tables {
        _id
        name
        title
        data
        category
      }
    }
  `;

  const headers = { Authorization: `Bearer ${user._accessToken}` };
  const getTables = async () => {
    const response = await request(GRAPHQL_ENDPOINT, getTablesQuery, {}, headers);
    setTables(response.tables);
  };
  useEffect(() => {
    getTables();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  let generators = [
    { category: "npc", name: "NPC Generator", order: npcOrder },
    { category: "building", name: "Building Generator", order: buildingOrder },
    { category: "street", name: "Street Generator", order: streetOrder },
    { category: "cult", name: "Cult Generator", order: cultOrder },
    { category: "score", name: "Score Generator", order: scoreOrder },
  ];

  // ADD SEARCH FUNCTION in sticky navbar, with clear all button
  if (tables.length === 0) {
    return <Loading />;
  }

  // // Filter based on search
  // const filteredTables = (() => {
  //   return tables.filter(table => {
  //     let valid = false;
  //     const lowerSearch = search.toLowerCase();
  //     // Check name, unit, and section for search
  //     if (table.title.toLowerCase().includes(lowerSearch)) {
  //       valid = true;
  //     }
  //     if (item.name.toLowerCase().includes(lowerSearch)) {
  //       valid = true;
  //     }
  //     if (item.name.category.toLowerCase().includes(lowerSearch)) {
  //       valid = true;
  //     }
  //     return valid;
  //   })
  // })();
  const filteredTables = (() => {
    return tables.filter((table) => !table.category);
  })();
  // const filteredGenerators = (() => {
  //   return tables.filter(table => {
  //     let valid = false;
  //     const lowerSearch = search.toLowerCase();
  //     // Check name, unit, and section for search
  //     if (table.title.toLowerCase().includes(lowerSearch)) {
  //       valid = true;
  //     }
  //     if (item.name.toLowerCase().includes(lowerSearch)) {
  //       valid = true;
  //     }
  //     if (item.name.category.toLowerCase().includes(lowerSearch)) {
  //       valid = true;
  //     }
  //     return valid;
  //   })
  // })();

  return (
    <>
      <SearchBar search={search} handleSearchChange={handleSearchChange} />
      <Box p={4} px={{ xl: 8 }} minHeight="calc(100vh-64px)">
        <Grid container spacing={{ xs: 2, xl: 4 }}>
          {generators.map((generator) => (
            <Grid key={generator.category} item xs={12} md={6}>
              <Generator
                tables={tables.filter((table) => table.category === generator.category)}
                name={generator.name}
                order={generator.order}
              />
            </Grid>
          ))}
          {filteredTables.map((table) => (
            <Grid key={table._id} item xs={12} sm={6} lg={4}>
              <Table table={table} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
