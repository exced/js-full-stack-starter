import fs from 'fs'

// Dataloader 
export const batch = (collection, ids) => (
  collection.find({ _id: { $in: ids } })
    .toArray()
    .then(data => {
      let map = data.reduce((a, e) => ({ ...a, [e._id]: e }), {})
      return ids.map(id => map[id])
    })
)

export const readFileSyncToBase64 = (path) => (
  fs.readFileSync(path).toString('base64')
)

export const removeFileAsync = (path) => (
  fs.unlink(path)
)