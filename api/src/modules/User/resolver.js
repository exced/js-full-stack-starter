/**
 *
 * @flow
 */

export default {
  User: {
    id: user => user._id
  },
  Query: {
    profile: (root, params, { User }) => User.profile(params)
  },
  Mutation: {
    login: (root, { email, password }, { User }) => User.login(email, password),
    signup: (root, { email, password }, { User }) =>
      User.signup(email, password)
  },
  Subscription: {
    userCreated: user => user
  }
};
