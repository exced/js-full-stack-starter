/**
 *
 * @flow
 */

import { GraphQLScalarType } from 'graphql';

import { typeDefs as directiveTypeDefs, schemaDirectives } from './directives';
import {
  typeDefs as customTypeDefs,
  resolvers as customTypeResolvers
} from './types';
import {
  typeDef as userTypeDef,
  resolver as userResolver
} from './modules/User/schema';

const mergeResolvers = (...resolvers: Array<Object>) => {
  const base = { Query: {}, Mutation: {}, Subscription: {} };
  return resolvers.reduce((acc, resolver) => {
    if (typeof resolver === 'object') {
      const { Query, Mutation, Subscription, ...rest } = resolver;
      return {
        ...acc,
        ...rest,
        Query: {
          ...acc.Query,
          ...(Query || {})
        },
        Mutation: {
          ...acc.Mutation,
          ...(Mutation || {})
        },
        Subscription: {
          ...acc.Subscription,
          ...(Subscription || {})
        }
      };
    }
    return { ...acc, resolver };
  }, base);
};

export const typeDefs = [userTypeDef, ...directiveTypeDefs, ...customTypeDefs];
export const resolvers = mergeResolvers(userResolver, ...customTypeResolvers);
export { schemaDirectives };
