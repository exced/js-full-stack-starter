import './Config/Reactotron'
import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { ApolloProvider } from 'react-apollo'
import registerServiceWorker from './registerServiceWorker'
import Loading from './Components/Loading'
import Navigation from './Containers/Navigation'

import { store, persistor, client, history } from './Store'

const onBeforeLift = () => {
  // take some action before the gate lifts
}

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <PersistGate loading={<Loading />} onBeforeLift={onBeforeLift} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Navigation />
      </ConnectedRouter>
    </PersistGate>
  </ApolloProvider>,
  document.querySelector('#root')
)
registerServiceWorker()
