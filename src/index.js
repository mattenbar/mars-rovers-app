import React from 'react';
import ReactDOM from 'react-dom';
import history from "./history";

import './css/index.css';
import App from './App';

import thunk from 'redux-thunk'
import {BrowserRouter } from 'react-router-dom'


import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/combinedReducers'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

root.render(
  <Provider store={store}>
    <BrowserRouter  history={history}>
      <App />
    </BrowserRouter >
  </Provider>
);