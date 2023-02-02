import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "./userContext";

export default function NavBar() {
  const location = useLocation();
  const { logOutUser } = useContext(UserContext);
  return (
    <Box>
      <AppBar position="relative" sx={{ zIndex: 2000 }}>
        <Toolbar>
          <Typography
            variant="h6"
            mr={5}
            component={Link}
            color="primary.contrastText"
            to="/"
            sx={{ textDecoration: "none" }}>
            John's Stuff
          </Typography>
          <Tabs value={location.pathname} textColor="primary" indicatorColor="secondary">
            <Tab value="/bitd/clocks" label="Clocks" component={Link} to="/bitd/clocks" />
            <Tab value="/bitd/tables" label="Tables" component={Link} to="/bitd/tables" />
            <Tab value="/bitd/notes" label="Notes" component={Link} to="/bitd/notes" />
            <Tab value="/bitd/reference" label="Reference" component={Link} to="/bitd/reference" />
          </Tabs>
          <Button onClick={logOutUser} color="secondary" sx={{ ml: "auto" }}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
