import React from "react";
import { Layout } from "./components";
import { AuthProvider, MaterialUiProvider, NotificationProvider } from "./providers";

const App = () => {
  return (
    <NotificationProvider>
      <MaterialUiProvider>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </MaterialUiProvider>
    </NotificationProvider>
  );
};

export default App;
