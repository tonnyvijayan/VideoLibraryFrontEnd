import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { VideoContextProvider } from "./contexts/VideoContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <VideoContextProvider>
        <App />
      </VideoContextProvider>
    </Router>
  </React.StrictMode>
);
