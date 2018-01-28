import { Types } from 'react-file-manager'

/**
 * Transform files to match File Manager API.
 * Basically add required Types
 * @param {Array} files 
 */
export const toMatchFileManager = files => {
  let map = files.reduce((a, e) => ({
    ...a,
    [e.id]: {
      ...e,
      type: e.hasOwnProperty('mimetype') ? Types.file : Types.folder,
      children: [],
    },
  }), {})
  for (let i = 0; i < files.length; i++) {
    const e = files[i]
    if (e.parent) {
      map[e.parent].children.push(e.id)
    }
  }
  return map
}