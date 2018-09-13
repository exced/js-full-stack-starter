/**
 *
 * @flow
 */

import { AuthenticationError, ForbiddenError } from 'apollo-server';
import DataLoader from 'dataloader';
import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from './constants';
import { mongoBatch } from '../../utils/dataloader';

export type UserModel = {
  user: (id: string) => Promise<Object>,
  login: (email: string, password: string) => Promise<Object>,
  signup: (email: string, password: string) => Promise<Object>,
  profile: (id: string) => Promise<Object>
};

const make = ({ connector, pubsub, guard }: Object): UserModel => {
  const collection = connector.mongo.collection('User');
  const loader = new DataLoader(ids => mongoBatch(collection, [...ids]));

  const _findOneById = (id: string) => loader.load(id);

  const _all = ({ offset = 0, limit = 10, query = {} }) =>
    collection
      .find(query)
      .sort({ createdAt: 1 })
      .skip(offset)
      .limit(limit)
      .toArray();

  const _insert = async input => {
    const doc = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const id = (await collection.insertOne(doc)).insertedId;
    const user = await _findOneById(id);
    pubsub.publish('userCreated', user);
    return user;
  };

  const _updateById = (id: string, doc: Object) => {
    const user = collection.update(
      { _id: id },
      {
        $set: {
          ...doc,
          updatedAt: new Date()
        }
      }
    );
    loader.clear(id);
    const ret = _findOneById(id);
    pubsub.publish('userUpdated', ret);
    return ret;
  };

  const _removeById = async (id: string) => {
    const res = await collection.remove({ _id: id });
    if (res && res.result && res.result.ok === 1) {
      loader.clear(id);
      return true;
    }
    return false;
  };

  const user = _findOneById;

  const login = async (email: string, password: string) => {
    const user = await collection.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.hash))) {
      throw new AuthenticationError('User not found');
    }
    const token = guard.tokenize({
      id: user._id,
      email: email
    });
    return { token };
  };

  const signup = async (email: string, password: string) => {
    const user = await collection.findOne({ email });
    if (user) {
      throw new ForbiddenError('User already exists');
    }
    // We don't want to store plain text password
    const doc = {
      email,
      hash: await bcrypt.hash(password, SALT_ROUNDS)
    };
    const insertedUser = await _insert(doc);
    const token = guard.tokenize({
      id: insertedUser._id,
      email
    });
    return { token };
  };

  const profile = (id: string) => _findOneById(id);

  return {
    user,
    login,
    signup,
    profile
  };
};

export default make;
