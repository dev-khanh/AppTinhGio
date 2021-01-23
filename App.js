import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createAppMiddleware from 'redux-saga';
import allReducer from './src/reducer';
import MyAppNavigation from './src/MyAppNavigation';
import rootSaga from './src/saga/rootSaga';

const SagaMiddleware = createAppMiddleware();
const store = createStore(allReducer, applyMiddleware(SagaMiddleware));

export default () => (
  <Provider store={store}>
    <MyAppNavigation />
  </Provider>
);
if (process.env.NODE_ENV !== 'test') {
  SagaMiddleware.run(rootSaga);
}
