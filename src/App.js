import React from "react";
import { Main } from "./Main";
import { AuthProvider, MaterialUiProvider, NotificationProvider } from "./providers";

const App = () => {
  return (
    <NotificationProvider>
      <MaterialUiProvider>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </MaterialUiProvider>
    </NotificationProvider>
  );
};

export default App;
