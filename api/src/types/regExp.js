/**
 *
 * @flow
 */

import { gql } from 'apollo-server';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export const typeDef = gql`
  scalar RegExp
`;

export const resolver = new GraphQLScalarType({
  name: 'RegExp',
  description: 'Regular Expression',
  parseValue: (value: any) => new RegExp(value),
  serialize: (value: any) => value.toString(),
  parseLiteral: ast => (ast.kind === Kind.STRING ? new RegExp(ast.value) : null)
});
