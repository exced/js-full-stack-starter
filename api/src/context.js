/**
 *
 * @flow
 */


import { configureModels, configureContainers } from './models';
import { createPubSub } from './subscription';

import type {Connectors} from './connectors/connectors'
import type { Config } from './config/config';
import type { Models } from './models';

export type Context = Models;

export const createContext = ({connectors,config}: {connectors: Connectors, config: Config}) => async ({ req }: Object) => {

  const models = configureModels({
    connectors: {
      mongo: connectors.mongoConnector
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
