// create global store for Providers
// apply middleware in createStore method

import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware             from 'redux-saga'
import rootSaga                         from 'sagas'
import logger                           from './middleware/logger';
import rootReducer                      from 'reducers';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(logger, sagaMiddleware)

const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);

export default store;