import React from "react";
import { AuthProvider } from "./context/auth";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { Main } from "./Main";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "./ui/SnackbarUtils";

const App = () => {
  return (
    <SnackbarProvider domRoot={document.getElementById("react-notification")}>
      <SnackbarUtilsConfigurator />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Main />
        </AuthProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
