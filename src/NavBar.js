import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" mr={5}>
            John's Stuff
          </Typography>
          <Tabs value={location.pathname} textColor="primary" indicatorColor="secondary">
            <Tab value="/clocks" label="Clocks" component={Link} to="/clocks" />
            <Tab value="/tables" label="Table" component={Link} to="/tables" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
