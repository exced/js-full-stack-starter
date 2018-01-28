import ApolloClient, { createBatchingNetworkInterface, IntrospectionFragmentMatcher } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import { endpoint } from '../Services/Api'

// Tell us if given store has given query. Avoids error on updating store after mutation if query has not been made
export const hasQuery = (store, query) => Object.keys(store.data.ROOT_QUERY).some((k) => ~k.indexOf(query))

// Apollo Client
export const createClient = (store) => {

  const networkInterface = createBatchingNetworkInterface({
    uri: `${endpoint.baseURL}/graphql`,
    batchInterval: 100,  // in milliseconds
    batchMax: 50,
    opts: {
      // Options to pass along to `fetch`
    }
  })

  const authMiddleware = {
    applyBatchMiddleware(req, next) {
      const { options } = req
      if (!options.headers) {
        options.headers = {}
      }
      const { token } = store.getState().auth
      options.headers.authorization = token ? `Bearer ${token}` : null
      next()
    }
  }

  const timeoutMiddleware = {
    applyBatchMiddleware(req, next) {
      setTimeout(next, 500)
    }
  }

  networkInterface.use([authMiddleware, timeoutMiddleware])

  // Fragment Matcher for Interfaces and Unions
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types: [
          {
            "kind": "INTERFACE",
            "name": "IFile",
            "possibleTypes": [
              {
                "name": "File"
              },
              {
                "name": "Folder"
              }
            ]
          },
        ],
      },
    }
  })

  // WS Subscriptions
  const wsClient = new SubscriptionClient(`${endpoint.wsBaseURL}/subscriptions`, {
    reconnect: true,
  })

  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
  )

  const client = new ApolloClient({
    // networkInterface,
    networkInterface: networkInterfaceWithSubscriptions,
    fragmentMatcher,
    // queryDeduplication: false,
  })

  return client
}
