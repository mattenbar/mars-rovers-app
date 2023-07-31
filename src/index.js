import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";

// import store from "./store";

import "./css/index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

//import { Provider } from "react-redux";
//import { configureStore } from "@reduxjs/toolkit";
//import combinedReducers from "./reducers/CombinedReducers";
//import { createRoot } from "react-dom/client";
//import { fetchRovers } from "./actions/fetchRovers";

//import history from "./history";

//import { Router } from "react-router-dom";

// const store = configureStore({ reducer: combinedReducers });

// const container = document.getElementById("root");
// const root = createRoot(container);

// // fetchRovers()
// store.dispatch(fetchRovers());

// root.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <App />
//     </Router>
//   </Provider>
// );

// if (process.env.NODE_ENV !== "production" && module.hot) {
//   module.hot.accept("./App", root);
// }
