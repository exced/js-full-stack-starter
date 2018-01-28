import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

/**
 * @example
 * input: 
 * {"offset": 0, "limit": 30}
 */
export const users = gql`
query users($offset: Int!, $limit: Int!) {
  users(offset: $offset, limit: $limit) {
		id
    username
    service {
      id
      title
    }
  }
}
`

export const usersQuery = graphql(users, {
  options: () => ({ variables: { offset: 0, limit: 20 } }),
  props: ({ data: { loading, error, users, refetch, fetchMore } }) => ({
    loading, error, users, refetch, loadMoreEntries: () => (
      fetchMore({
        variables: { offset: users.length, limit: 20 },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) { return previousResult }
          // Append the new requests results to the old one
          return { ...previousResult, users: [...previousResult.users, ...fetchMoreResult.users] }
        },
      })
    )
  })
})