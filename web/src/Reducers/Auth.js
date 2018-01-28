import {
  SIGNIN_REQUEST,
  SIGNUP_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTO_LOGIN,
  LOGOUT,
} from '../Types/Auth'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
  token: null,
  username: null,
  roles: [],
  isLoggedIn: false,
  loading: false,
  error: null,
  statusText: null
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        statusText: '',
      }

    case SIGNUP_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        statusText: '',
      }

    case AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        token: action.payload.token,
        username: action.payload.username,
        roles: action.payload.roles,
        isLoggedIn: true,
        loading: false,
        statusText: '',
      }

    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        token: null,
        roles: [],
        isLoggedIn: false,
        error: action.payload.status,
        statusText: action.payload.statusText,
      }

    case AUTO_LOGIN:
      return {
        ...state,
        error: null,
        isLoggedIn: true,
        loading: false,
        statusText: '',
      }

    case LOGOUT:
      return {
        ...state,
        error: null,
        token: null,
        loading: false,
        isLoggedIn: false,
        statusText: '',
      }

    default:
      return state
  }
}