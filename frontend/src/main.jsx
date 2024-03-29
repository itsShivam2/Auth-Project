import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthState from "./contexts/authContext/MyState";
// import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <AuthState>
        <App />
      </AuthState>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
