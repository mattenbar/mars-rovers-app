import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from "./reducers/CombinedReducers";
import { createRoot } from "react-dom/client";
import { fetchRovers } from "./actions/fetchRovers";

import history from "./history";

import "./css/index.css";
import App from "./App";
import { Router } from "react-router-dom";

const store = configureStore({ reducer: combinedReducers });

const container = document.getElementById("root");
const root = createRoot(container);

// fetchRovers()
store.dispatch(fetchRovers());

root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./App", root);
}
