import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";
import MainPage from "./Components/MainPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Calculadora de Amortización de Préstamos
          </Typography>
        </Toolbar>
      </AppBar>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
