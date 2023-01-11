import { createTheme } from "@mui/material/styles";
import { deepPurple, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[700],
      light: purple[300],
      dark: deepPurple[700],
    },
  },
});

export default theme;
