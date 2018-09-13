/**
 *
 * @flow
 */

import { gql } from 'apollo-server';

export type UserType = {
  id: string,
  email: string,
  createdAt: string,
  updatedAt: string
};

export type UserAuthInputType = {
  email: string,
  password: string
};

export const typeDef = gql`
  """
  User is the representation of a user.
  """
  type User {
    id: ID!
    email: String!
    createdAt: Date! @date
    updatedAt: Date! @date
  }

  """
  Auth represents an authentication token.
  """
  type Auth {
    token: String!
    # Expires at ...
  }

  extend type Query {
    profile: User
  }

  extend type Mutation {
    login(email: String!, password: String!): Auth
    signup(email: String!, password: String!): Auth
  }

  extend type Subscription {
    userCreated: User
  }
`;
