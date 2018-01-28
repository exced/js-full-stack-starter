import apisauce from 'apisauce'

export const endpoint = {
  baseURL: 'http://localhost:8000',
  wsBaseURL: 'ws://localhost:8001',
  apiBaseURL: 'http://localhost:8000/graphql'
}

const create = (token) => {
  const api = apisauce.create({
    baseURL: endpoint.baseURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : null
    },
    timeout: 10000,
    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: false,
    // `validateStatus` defines whether to resolve or reject the promise for a given
    // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
    // or `undefined`), the promise will be resolved; otherwise, the promise will be
    // rejected.
    validateStatus: (status) => status >= 200 && status < 300, // default
  })

  const signin = (username, password) => api.post('/signin', { username, password })
  const signup = (username, password) => api.post('/signup', { username, password })
  const upload = (files) => api.post('/upload', files)

  return {
    signin,
    signup,
    upload,
  }
}

export default create
