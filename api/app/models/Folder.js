import DataLoader from 'dataloader'
import { batch } from './helpers'
import { pubsub } from '../subscription'
import { AuthRequired, UserNotAllowed } from '../errors/auth'

export default class Folder {

  constructor(context) {
    this.context = context
    this.collection = this.context.db.collection('File')
    this.loader = new DataLoader(ids => batch(this.collection, ids))
  }

  findOneById = (id) => this.loader.load(id)

  insert = async (input, user) => {
    if (!user) {
      throw new AuthRequired()
    }
    const doc = {
      ...input,
      userId: user._id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    const id = (await this.collection.insertOne(doc)).insertedId
    const file = await this.findOneById(id)
    pubsub.publish('fileInserted', file)
    return file
  }

  updateById = (id, doc, user) => {
    if (!user) {
      throw new AuthRequired()
    }
    this.collection.update({ _id: id }, {
      $set: {
        ...doc,
        updatedAt: Date.now(),
      },
    })
    this.loader.clear(id)
    const file = this.findOneById(id)
    pubsub.publish('fileUpdated', file)
    return file
  }

  cascadeRemove = (id) => {
    const file = this.collection.remove({ _id: id })
    this.loader.clear(id)
    this.collection
      .find({ parent: id })
      .forEach(doc => this.cascadeRemove(doc._id))
  }

  removeById = (id, user) => {
    if (!user) {
      throw new AuthRequired()
    }
    const file = this.cascadeRemove(id)
    this.loader.clear(id)
    pubsub.publish('fileRemoved', id)
    return id
  }

}
