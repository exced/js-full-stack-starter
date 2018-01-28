import { createError } from 'apollo-errors'

export const AuthRequired = createError('AuthRequired', {
  message: 'Authentication required'
})

export const UserNotAllowed = createError('UserNotAllowed', {
  message: 'User not allowed'
})