import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'

import config from '../Config/Debug'

// creates the store
export default (rootReducer, rootSaga, history) => {

  // Redux Configuration 
  const middlewares = []
  const enhancers = []

  // Router Middleware 
  middlewares.push(routerMiddleware(history))

  // Saga Middleware 
  const sagaMonitor = config.useReactotron ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middlewares.push(sagaMiddleware)

  //  Assemble Middleware
  enhancers.push(applyMiddleware(...middlewares))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = config.useReactotron ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}
