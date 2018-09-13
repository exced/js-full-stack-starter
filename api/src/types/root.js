/**
 *
 * @flow
 */

import { gql } from 'apollo-server';

export const typeDef = gql`
  type Query {
    _root: String
  }

  type Mutation {
    _root: String
  }

  type Subscription {
    _root: String
  }
`;

export const resolver = {
  Query: {
    _root: () => 'empty'
  },
  Mutation: {
    _root: () => 'empty'
  },
  Subscription: {
    _root: () => 'empty'
  }
};
