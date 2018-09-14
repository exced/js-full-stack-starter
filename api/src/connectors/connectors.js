/**
 *
 * @flow
 */

import createMongoConnector from './mongo';

import type { Config } from '../config/config';
import type { MongoConnector } from './mongo';

export type Connectors = {
  mongo: MongoConnector
};

export const createConnectors = async (
  config: Config
): Promise<Connectors> => ({
  mongo: await createMongoConnector({ mongo: config.db })
});
