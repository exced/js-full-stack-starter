import { readFileAsyncToBase64 } from '../models/helpers'

const resolver = {
  File: {
    id: (file) => file._id,
    base64: (file) => readFileAsyncToBase64(file.path)
  },
  Mutation: {
    createFile: (root, { input }, { File, user }) => File.insert(input, user),
    updateFile: (root, { id, input }, { File, user }) => File.updateById(id, input, user),
    removeFile: (root, { id }, { File, user }) => File.removeById(id, user),
  },
}

export default resolver