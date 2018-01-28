import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { files } from '../Queries/File'

export const updateFile = gql`
mutation updateFile($id: ObjectID!, $input: FileInput!) {
  updateFile(id: $id, input: $input) {
    id
    title
    createdAt
    updatedAt
    parent
    ... on File {
      base64
      mimetype
    }
  }
}
`

export const removeFile = gql`
mutation removeFile($id: ObjectID!) {
  removeFile(id: $id)
}
`

export const updateFileMutation = graphql(updateFile, {
  props: ({ ownProps, mutate }) => ({
    onUpdateFile: (id, input) => mutate({
      variables: { id, input },
      update: (store, { data: { updateFile } }) => {
        if (updateFile) {
          const data = store.readQuery({ query: files, variables: { offset: 0, limit: 30 } })
          const newData = { ...data, files: data.files.map(e => e.id === updateFile.id ? updateFile : e) }
          store.writeQuery({ query: files, variables: { offset: 0, limit: 30 }, data: newData })
        }
      }
    })
  })
})

export const removeFileMutation = graphql(removeFile, {
  props: ({ ownProps, mutate }) => ({
    onRemoveFile: (id) => mutate({
      variables: { id },
      update: (store, { data: { removeFile } }) => {
        if (removeFile) {
          const data = store.readQuery({ query: files, variables: { offset: 0, limit: 30 } })
          const newData = { ...data, files: data.files.filter(e => e.id !== removeFile) }
          store.writeQuery({ query: files, variables: { offset: 0, limit: 30 }, data: newData })
        }
      }
    })
  })
})