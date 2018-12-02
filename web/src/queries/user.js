/**
 *
 * @flow
 */

import gql from "graphql-tag";

export const profile = gql`
  query profile {
    profile {
      id
      email
      createdAt(format: "YYYY MM DD")
      updatedAt(format: "YYYY MM DD")
    }
  }
`;
