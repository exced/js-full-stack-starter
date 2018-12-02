/**
 * 
 * @flow
 */

import { guard } from './guard';

import type { Guard } from './guard';

export const prod = process.env.NODE_ENV === 'production';
export const dev = !prod;

export type MongoConfig = {
  uri: string,
  name: string
};

export type Config = {
  guard: Guard,
  db: MongoConfig
};

const devConfig: Config = {
  guard,
  db: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/graphl-starter',
    name: process.env.MONGO_NAME || 'graphl-starter'
  }
};

const prodConfig: Config = {
  guard,
  db: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/graphl-starter',
    name: process.env.MONGO_NAME || 'graphl-starter'
  }
};

export default (prod ? prodConfig : devConfig);
