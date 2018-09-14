/**
 *
 * @flow
 */

import { enhanceModels } from './models';

import type { Config } from './config/config';
import type { Models } from './models';

export type Context = Models;

export const createContext = ({
  models,
  config
}: {
  models: Models,
  config: Config
}) => async ({ req }: Object) => {
  const userFromReq = config.guard.getUserFromReq(req);
  const user =
    userFromReq && userFromReq.id && (await models.User.user(userFromReq.id));

  return {
    user,
    ...enhanceModels({ models, user })
  };
};
