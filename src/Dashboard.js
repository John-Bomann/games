import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  const features = [
    {
      name: "Clocks",
      description: "Add and remove clocks to measure player progress",
      path: "/bitd/clocks",
    },
    {
      name: "Tables",
      description: "Use rollable tables for NPC names, locations, or random encounters",
      path: "/bitd/tables",
    },
    {
      name: "Notes",
      description: "Keep track of NPCs, locations, or plot points in a templated environment",
      path: "/bitd/notes",
    },
    {
      name: "Reference",
      description: "Rules reference for easy access",
      path: "/bitd/reference",
    },
  ];
  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h3" bgcolor="primary.main" color="primary.contrastText" py={1}>
          Blades in the Dark
        </Typography>
        <Stack direction="row" spacing={10} sx={{ px: 3, pt: 3 }} justifyContent="center">
          {features.map((feature) => (
            <Card key={feature.path} sx={{ width: 400 }}>
              <CardActionArea component={Link} to={feature.path} sx={{ p: 2, height: "100%" }}>
                <Typography variant="h5" gutterBottom>
                  {feature.name}
                </Typography>
                <Typography variant="p">{feature.description}</Typography>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Box>
      {/* <Box mb={3}>
        <Typography variant="h3" bgcolor="primary.main" color="primary.contrastText" py={1}>
          Dungeons and Dragons
        </Typography>
        <Stack direction="row" spacing={10} sx={{ px: 3, pt: 3 }}>
          {features.map((feature) => (
            <Card sx={{ width: 400 }}>
              <CardActionArea component={Link} to={feature.path}>
                <CardContent>
                  <Typography variant="h5">{feature.name}</Typography>
                  <Typography variant="p">{feature.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Box> */}
      <Outlet />
    </Box>
  );
}
