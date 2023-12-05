import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { AuthContext } from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContext>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthContext>
  </React.StrictMode>
);
