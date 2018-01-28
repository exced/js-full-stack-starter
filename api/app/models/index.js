import User from './User'
import File from './File'
import Folder from './Folder'

const models = {
  User,
  File,
  Folder,
}
export default models

export const configureModels = context => (
  Object.keys(models).reduce((a, e) => ({
    ...a, [e]: new models[e](a)
  }), context)
)