import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthState from "./contexts/authContext/MyState";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/user/userSlice.js";
import store from "./store/store";
// const store = configureStore({
//   reducer: {
//     user: userSlice, // Add your user slice reducer to the Redux store
//     // Add other reducers if you have them
//   },
//   devTools: true,
// });



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AuthState> */}
        <App />
      {/* </AuthState> */}
    </Provider>
  </React.StrictMode>
);
