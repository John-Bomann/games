import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import { HashRouter } from "react-router-dom";
import { UserProvider } from "./userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
