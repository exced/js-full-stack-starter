import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

/**
 * @example
 * input: 
 * {"offset": 0, "limit": 30}
 */
export const files = gql`
query files($offset: Int, $limit: Int) {
  files(offset: $offset, limit: $limit) {
    id
    title
    createdAt
    updatedAt
    parent
    ... on Folder {
      children
    }
    ... on File {
      base64
      mimetype
    }
  }
}
`

export const filesQuery = graphql(files, {
  options: () => ({ variables: { offset: 0, limit: 30 } }),
  props: ({ data: { loading, error, files, refetch, fetchMore } }) => ({
    loading, error, files, refetch, loadMoreEntries: () => (
      fetchMore({
        variables: { offset: files.length, limit: 30 },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) { return previousResult }
          // Append the new requests results to the old one
          return { ...previousResult, files: [...previousResult.files, ...fetchMoreResult.files] }
        },
      })
    )
  })
})