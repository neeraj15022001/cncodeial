import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import reducer from '../reducers';

let store;
export default function configureStore() {
  console.log('%c configuring store', 'background: navy; color: white');
  store = createStore(reducer, applyMiddleware(thunk, logger));
  console.log('%c Store created', 'background: navy; color: white', store);
  return store;
}
