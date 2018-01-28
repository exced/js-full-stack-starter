import {
  SIGNIN_REQUEST,
  SIGNUP_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTO_LOGIN,
  LOGOUT,
} from '../Types/Auth'

// Action Creators
export const signupRequest = (username, password) => ({
  type: SIGNUP_REQUEST,
  payload: {
    username,
    password,
  }
})

export const signinRequest = (username, password) => ({
  type: SIGNIN_REQUEST,
  payload: {
    username,
    password
  }
})

export const authSuccess = (token, username, roles) => ({
  type: AUTH_SUCCESS,
  payload: {
    token,
    username,
    roles,
  }
})

export const authFailure = (error) => ({
  type: AUTH_FAILURE,
  payload: {
    status: error.response.status,
    statusText: error.response.statusText
  }
})

export const autoLogin = (token, username, roles) => ({
  type: AUTO_LOGIN,
  payload: {
    token,
    username,
    roles
  }
})

export const logout = () => ({ type: LOGOUT })
