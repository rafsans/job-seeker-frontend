import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { WireframeProvider } from "./context/WireframeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WireframeProvider>
      <App />
    </WireframeProvider>
  </StrictMode>
);
