import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">John's Stuff</Typography>
          <Tabs value={location.pathname}>
            <Tab label="Clocks" component={<Link />} to="clocks" />
            <Tab label="Table" component={<Link />} to="tables" />
          </Tabs>
        </Toolbar>
        <Outlet />
      </AppBar>
    </div>
  );
}
