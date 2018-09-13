/**
 *
 * @flow
 */

import { ObjectId } from './mongo';

export const mongoBatch = (collection: Object, ids: string[]) => {
  return collection
    .find({ _id: { $in: ids.map(id => ObjectId(id)) } })
    .toArray()
    .then(data => {
      const map = data.reduce((a, e) => ({ ...a, [e._id]: e }), {});
      return ids.map(id => map[id]);
    });
};
