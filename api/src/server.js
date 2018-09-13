/**
 *
 * @flow
 */

import { ApolloServer, AuthenticationError } from 'apollo-server';

import config from './config/config';
import { typeDefs, resolvers, schemaDirectives } from './schema';
import { createContext } from './context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: createContext(config),
  formatError: error => {
    console.error(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  }
  // Add Apollo Engine to track performance issues
  // See : Apollo Engine https://www.apollographql.com/docs/apollo-server/features/metrics.html
  // engine: {
  //   apiKey: "YOUR API KEY HERE"
  // }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
