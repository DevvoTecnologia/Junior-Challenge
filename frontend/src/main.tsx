import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RingProvider } from "./context/RingContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RingProvider>
      <App />
    </RingProvider>
  </StrictMode>
);
