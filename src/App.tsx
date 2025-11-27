// src/App.tsx
import React from "react";
import { HashRouter } from "react-router-dom";
import { AppProviders } from "./app/providers/AppProviders";
import { AppRoutes } from "./app/routes";

export const App: React.FC = () => {
  return (
    <HashRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </HashRouter>
  );
};

export default App;
