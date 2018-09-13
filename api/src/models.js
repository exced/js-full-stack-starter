/**
 *
 * @flow
 */

import createUser from './modules/User/model';
import createUserContainer from './modules/User/container';

import type { MongoConnector } from './connectors/mongo';
import type { UserModel } from './modules/User/model';

type Connectors = {
  mongo: MongoConnector
};

type ConfigureModelsContext = {
  connectors: Connectors,
  pubsub: any,
  guard: Object
};

export type Models = {
  User: UserModel
};

export type ModelsContext = {
  models: Models
};

export const configureModels = (ctx: ConfigureModelsContext): Models => {
  const { connectors, pubsub, guard } = ctx;
  return {
    User: createUser({ pubsub, guard, connector: connectors.mongo })
  };
};

export const configureContainers = (ctx: Object) => ({
  User: createUserContainer(ctx)
});
