import { routerReducer } from 'react-router-redux'
import storage from 'redux-persist/es/storage'
import { persistStore, persistCombineReducers } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import createHistory from 'history/createBrowserHistory'
import configureStore from './ConfigureStore'
import rootSaga from '../Sagas/'
import AppReducers from '../Reducers'
import { createClient } from './ApolloClient'
import { LOGOUT } from '../Types/Auth'

// Router history
const history = createHistory()

// Redux persist config
const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  whitelist: ['auth'],
}


const createStore = () => {

  /* ------------- Assemble The Reducers ------------- */
  const appReducer = persistCombineReducers(persistConfig, {
    router: routerReducer,
    ...AppReducers,
  })

  // Empty Redux Store when user logout.
  const initialState = appReducer({}, {})

  const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      state = initialState
    }

    return appReducer(state, action)
  }

  return configureStore(rootReducer, rootSaga, history)
}

// Redux Store
const store = createStore()

// Redux Persist
const persistor = persistStore(store)

// Apollo Client
const client = createClient(store)

export {
  store,
  persistor,
  client,
  history,
}