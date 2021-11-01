import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import configureStore from './components/store/store';

const store = configureStore();
console.log(store.getState());
const app = <App />;
const root = document.getElementById('root');
ReactDOM.render(app, root);
