import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { AuthContext } from "./context/AuthContext.tsx";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "react-redux";
import store from "./Store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContext>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <App />
            <Toaster />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </AuthContext>
  </React.StrictMode>
);
