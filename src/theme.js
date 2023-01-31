import { createTheme } from "@mui/material/styles";
import { blueGrey, deepPurple, grey, purple } from "@mui/material/colors";
import createPalette from "@mui/material/styles/createPalette";

const palette = createPalette({
  mode: "dark",
  primary: {
    main: deepPurple[300],
    light: "#AA90D7",
    dark: "#68518F",
  },
  secondary: {
    main: "#7581cd",
    light: "#a7b0ff",
    dark: "#44559c",
  },
  tertiary: {
    main: "#f06900",
    light: "#ff9a3e",
    dark: "#b63900",
  },
});

const theme = createTheme({
  palette,
  components: {
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       color: palette.secondary.main,
    //       "&.Mui-selected": {
    //         color: palette.secondary.light,
    //       },
    //     },
    //   },
    // },
    // MuiTabs: {
    //   styleOverrides: {
    //     indicator: {
    //       backgroundColor: palette.secondary.light,
    //     },
    //   },
    // },
  },
});

export default theme;
