/* eslint-disable react/jsx-filename-extension*/

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './Components/store';

import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'), // eslint-disable-line
);
