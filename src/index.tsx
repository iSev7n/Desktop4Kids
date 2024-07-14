import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { ASCII_LOGO, NAME } from "./config/branding.config";
import { TrackingManager } from "./features/tracking/trackingManager";
import { TimeManager } from "./features/_utils/time.utils";
import { App } from "./App";

TimeManager.reset();

TrackingManager.initialize();

// Render app
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log welcome message
const asciiLogoWidth = ASCII_LOGO.split("\n")[1].length;
const welcomeMessage = `Welcome to ${NAME}`;

// Calculate space with non-negative check
const spaceCount = Math.max(0, Math.ceil((asciiLogoWidth - welcomeMessage.length) / 2));
const space = "\n\n" + " ".repeat(spaceCount);
console.info(ASCII_LOGO + space + welcomeMessage);

// Remove trailing slash
window.onload = () => {
  if (window.location.pathname.endsWith("/")) {
    window.history.pushState({}, "", window.location.pathname.replace(/\/+$/, ""));
  }
};