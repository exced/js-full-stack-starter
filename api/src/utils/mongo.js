/**
 *
 * @flow
 */

import { ObjectID } from 'mongodb';

/**
 * Convert string to Mongo DB ID internal representation
 * @param {String} id
 */
export const ObjectId = (id: string) => new ObjectID(id);

/**
 * Convert date to Mongo DB ISODate internal representation
 * @param {String} id
 */
export const ISODate = (date: string) => new Date(date).toISOString();
