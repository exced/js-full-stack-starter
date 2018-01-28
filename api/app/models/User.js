import DataLoader from 'dataloader'
import { batch } from './helpers'
import { pubsub } from '../subscription'
import bcrypt from 'bcrypt'
import { ROLE_USER, ROLE_ADMIN, ROLE_SUPERADMIN } from './UserRoles'

const SALT_ROUNDS = 10

export default class User {

  constructor(context) {
    this.context = context
    this.collection = this.context.db.collection('User')
    this.loader = new DataLoader(ids => batch(this.collection, ids))
  }

  findOneById = async (id) => {
    const { hash, ...user } = await this.loader.load(id)
    return user
  }

  all = ({ offset = 0, limit = 10 }) => (
    this.collection
      .find()
      .sort({ createdAt: 1 })
      .skip(offset)
      .limit(limit)
      .toArray()
  )

  insert = async (input) => {
    const { password, ...rest } = input
    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const doc = {
      ...rest,
      hash,
      roles: [ROLE_USER],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    const id = (await this.collection.insertOne(doc)).insertedId
    const user = await this.findOneById(id)
    pubsub.publish('userInserted', user)
    return user
  }

  updateById = (id, doc) => {
    const user = this.collection.update({ _id: id }, {
      $set: {
        ...doc,
        updatedAt: Date.now(),
      },
    })
    this.loader.clear(id)
    const ret = this.findOneById(id)
    pubsub.publish('userUpdated', ret)
    return ret
  }

  removeById = (id) => {
    const user = this.collection.remove({ _id: id })
    this.loader.clear(id)
    pubsub.publish('userRemoved', id)
    return user
  }

}
