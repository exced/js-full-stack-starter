import jwtDecode from 'jwt-decode'

export const decodeToken = (token) => jwtDecode(token)
