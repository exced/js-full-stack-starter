/**
 *
 * @flow
 */

import { createPubSub } from './subscription';
import createUser from './modules/User/model';
import createUserContainer from './modules/User/container';

import type { Config } from './config/config';
import type { Connectors } from './connectors/connectors';
import type { UserModel } from './modules/User/model';

export type Models = {
  User: UserModel
};

export type ModelsContext = {
  models: Models
};

export const createModels = ({
  connectors,
  config
}: {
  connectors: Connectors,
  config: Config
}): Models => {
  const pubsub = createPubSub();
  const guard = config.guard;
  return {
    User: createUser({ pubsub, guard, connector: connectors.mongo })
  };
};

export const enhanceModels = (ctx: Object) => ({
  User: createUserContainer(ctx)
});
