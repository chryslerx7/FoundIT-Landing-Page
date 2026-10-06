import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import founditIcon from "./public/found-it-icon-light.svg";
import "./index.css";

const favicon =
  document.querySelector('link[rel="icon"]') ?? document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/svg+xml";
favicon.href = founditIcon;
if (!favicon.parentNode) {
  document.head.appendChild(favicon);
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

