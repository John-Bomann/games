import { createTheme } from "@mui/material/styles";
import { blueGrey, deepPurple, grey, purple } from "@mui/material/colors";
import createPalette from "@mui/material/styles/createPalette";

const palette = createPalette({
  primary: {
    main: purple[700],
    light: "#ae52d4",
    dark: "#4a0072",
  },
  secondary: {
    main: grey[300],
    light: grey[100],
    dark: grey[500],
  },
});

const theme = createTheme({
  palette,
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: palette.secondary.main,
          "&.Mui-selected": {
            color: palette.secondary.light,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: palette.secondary.light,
        },
      },
    },
  },
});

export default theme;
