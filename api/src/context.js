/**
 *
 * @flow
 */

import createMongoConnector from './connectors/mongo';
import { configureModels, configureContainers } from './models';
import { createPubSub } from './subscription';

import type { Config } from './config/config';
import type { Models } from './models';

export type Context = Models;

export const createContext = (config: Config) => async ({ req }: Object) => {
  const mongoConnector = await createMongoConnector({ mongo: config.db });

  const models = configureModels({
    connectors: {
      mongo: mongoConnector
    },
    pubsub: createPubSub(),
    guard: config.guard
  });

  const userFromReq = config.guard.getUserFromReq(req);
  const user =
    userFromReq && userFromReq.id && (await models.User.user(userFromReq.id));

  return {
    user,
    ...configureContainers({ models, user })
  };
};
