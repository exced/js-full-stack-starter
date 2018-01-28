const resolver = {
  User: {
    id: (user) => user._id,
  },
  Query: {
    users: (root, { offset, limit }, { User }) => User.all({ offset, limit }),
    user: (root, { id }, { User }) => User.findOneById(id),
  },
  Mutation: {
    updateUser: (root, { id, input }, { User }) => User.updateById(id, input),
  },
  Subscription: {
    userUpdated: user => user,
  },
}

export default resolver