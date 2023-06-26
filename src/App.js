import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ThemeProvider from "./theme";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>

    // BrowserRouter
    // Router
  );
}

export default App;
