const resolver = {
  IFile: {
    id: (file) => file._id,
  },
  Query: {
    files: (root, { offset, limit }, { File, user }) => File.all({ offset, limit }, user),
    file: (root, { id }, { File }) => File.findOneById(id),
  },
  Subscription: {
    fileUpdated: file => file,
    fileRemoved: id => id,
  },
}

export default resolver