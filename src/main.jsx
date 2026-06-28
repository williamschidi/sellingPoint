import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PropertiesProvider } from "./context/PropertiesContext.jsx";
import { SavedPropertiesProvider } from "./context/SavedPropertiesContext.jsx";
import { SavedSearchesProvider } from "./context/SavedSearchesContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <PropertiesProvider>
            <SavedPropertiesProvider>
              <SavedSearchesProvider>
                <App />
              </SavedSearchesProvider>
            </SavedPropertiesProvider>
          </PropertiesProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
