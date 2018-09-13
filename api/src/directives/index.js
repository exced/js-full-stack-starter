/**
 *
 * @flow
 */

import {
  SchemaDirective as dateSchemaDirective,
  typeDef as dateTypeDef
} from './date';

export const typeDefs = [dateTypeDef];
export const schemaDirectives = {
  date: dateSchemaDirective
};
