/**

 *
 * @flow
 */

import { MongoClient } from 'mongodb';

import type { MongoConfig } from '../config/config';

export type MongoConnector = {
  mongo: Object,
  close: () => void
};

export type ConnectorConfig = {
  mongo: MongoConfig
};

const create = async (config: ConnectorConfig): Promise<MongoConnector> => {
  const mongoClient = await MongoClient.connect(
    config.mongo.uri,
    { useNewUrlParser: true }
  );
  const mongo = mongoClient.db(config.mongo.name);

  const close = () => {
    mongoClient.close();
  };

  return {
    mongo,
    close
  };
};
export default create;
