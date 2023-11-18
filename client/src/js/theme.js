import { createTheme } from "@mui/material/styles";

// to use this theme, implement theme provider then pass this theme as a prop
// <ThemeProvider theme={theme}> -> place mui components after this tag then close it.

const theme = createTheme({
  palette: {
    primary: {
      main: "#004438",
    },
  },
});

const quizTheme = createTheme({
  palette: {
    primary: {
      main: "#db9c29",
    },
    text: {
      primary: "#db9c29",
    },
  },
});

export { theme, quizTheme };
