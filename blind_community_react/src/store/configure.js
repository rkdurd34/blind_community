import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import modules from './modules';

const configure = () => {
  if (process.env.NODE_ENV === 'production')
    return createStore(modules, applyMiddleware());
  else
    return createStore(modules, composeWithDevTools(applyMiddleware(logger)));
};

export default configure;
