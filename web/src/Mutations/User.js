import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { users } from '../Queries/User'

/**
 * @example
 * input: 
 * {"input": {"username": "test1","password": "test1","service": "service1"}}
 */
export const addUser = gql`
mutation addUser($input: UserInput!) {
  addUser(input: $input) {
    id
    username
    service {
      id
      title
    }
  }
}
`

export const updateUser = gql`
mutation updateUser($id: ID!, $input: UserUpdateInput!) {
  updateUser(id: $id, input: $input) {
    id
    username
    service {
      id
      title
    }
  }
}
`

export const removeUser = gql`
mutation removeUser($id: ID!) {
  removeUser(id: $id)
}
`

export const addUserMutation = graphql(addUser, {
  props: ({ ownProps, mutate }) => ({
    onAddUser: (input) => mutate({
      variables: { input },
      update: (store, { data: { addUser } }) => {
        const data = store.readQuery({ query: users, variables: { offset: 0, limit: 20 } })
        const newData = { ...data, users: [...data.users, addUser] }
        store.writeQuery({ query: users, variables: { offset: 0, limit: 20 }, data: newData })
      }
    })
  })
})

export const updateUserMutation = graphql(updateUser, {
  props: ({ ownProps, mutate }) => ({
    onUpdateUser: (id, input) => mutate({
      variables: { id, input },
      update: (store, { data: { updateUser } }) => {
        if (updateUser) {
          const data = store.readQuery({ query: users, variables: { offset: 0, limit: 20 } })
          const newData = { ...data, users: data.users.map(e => e.id === updateUser.id ? updateUser : e) }
          store.writeQuery({ query: users, variables: { offset: 0, limit: 20 }, data: newData })
        }
      }
    })
  })
})

export const removeUserMutation = graphql(removeUser, {
  props: ({ ownProps, mutate }) => ({
    onRemoveUser: (id) => mutate({
      variables: { id },
      update: (store, { data: { removeUser } }) => {
        if (removeUser) {
          const data = store.readQuery({ query: users, variables: { offset: 0, limit: 20 } })
          const newData = { ...data, users: data.users.filter(e => e.id !== removeUser) }
          store.writeQuery({ query: users, variables: { offset: 0, limit: 20 }, data: newData })
        }
      }
    })
  })
})