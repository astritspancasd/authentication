import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "../ui/theme";

export const MaterialUiProvider = (props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
