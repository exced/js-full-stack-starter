/**
 *
 * @flow
 */

import { auth } from '../../utils/guard';
import { compose } from '../../utils/func';

import type { UserModel } from './model';

/**
 * Guard model by authentication and authorization
 * @param {Object} user
 */
const guard = user => (model: Object) => ({
  ...model,
  profile: auth(user)(model.profile)
});

/**
 * Handle models dependencies
 * @param {Object} models
 */
const deps = (models: Object, user: Object) => (model: UserModel) => ({
  ...model,
  profile: () => model.profile(user._id)
});

const make = (ctx: Object) =>
  compose(
    guard(ctx.user),
    deps(ctx.models, ctx.user)
  )(ctx.models.User);

export default make;
