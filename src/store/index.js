import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const configureStore = (initialState) => {
  return createStoreWithMiddleware(rootReducer, initialState);
}

export default configureStore