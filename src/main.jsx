import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./LanguageContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
