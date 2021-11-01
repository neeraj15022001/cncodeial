import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import configureStore from './components/store/store';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const store = configureStore();
console.log(store.getState());
const app = (
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
const root = document.getElementById('root');
ReactDOM.render(app, root);
