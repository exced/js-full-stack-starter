export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILURE = 'AUTH_FAILURE'
export const AUTO_LOGIN = 'AUTO_LOGIN'
export const LOGOUT = 'LOGOUT'

export const ROLE_USER = 'ROLE_USER'
export const ROLE_ADMIN = 'ROLE_ADMIN'
export const ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN'

export const Lists = {
    all: [ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN],
    admins: [ROLE_ADMIN, ROLE_SUPER_ADMIN],
}