import { endpoint } from '../Services/Api'

export const imageBase = image => image ? `${endpoint.baseURL}/images/${image}` : image