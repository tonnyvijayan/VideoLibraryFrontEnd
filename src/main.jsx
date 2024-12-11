import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { VideoContextProvider } from "./contexts/VideoContextProvider.jsx";
import { AuthContextProvider } from "./contexts/AuthContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <VideoContextProvider>
          <App />
        </VideoContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
