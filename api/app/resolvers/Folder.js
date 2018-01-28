const resolver = {
  Folder: {
    id: (Folder) => Folder._id,
  },
  Mutation: {
    createFolder: (root, { input }, { Folder, user }) => Folder.insert(input, user),
    updateFolder: (root, { id, input }, { Folder, user }) => Folder.updateById(id, input, user),
    removeFolder: (root, { id }, { Folder, user }) => Folder.removeById(id, user),
  },
}

export default resolver