/**
 *
 * @flow
 */

import { typeDef as rootTypeDef, resolver as rootResolver } from './root';
import { typeDef as dateTypeDef, resolver as dateResolver } from './date';
import { typeDef as regExpTypeDef, resolver as regExpResolver } from './regExp';

export const typeDefs = [rootTypeDef, dateTypeDef, regExpTypeDef];
export const resolvers = [
  rootResolver,
  dateResolver,
  { RegExp: regExpResolver } // custom scalar type
];
