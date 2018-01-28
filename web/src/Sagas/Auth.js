import { call, put } from 'redux-saga/effects'
import { authSuccess, authFailure } from '../Actions/Auth'
import { purge } from '../Actions/Persist'
import { decodeToken } from '../Services/Auth'
import { push as routerPush } from 'react-router-redux'

// attempts to signin
export function* signin(api, action) {
  const { username, password } = action.payload

  // make the call to the api
  const response = yield call(api.signin, username, password)

  if (response.ok) {
    const { token } = response.data
    // do data conversion here if needed
    // decode jwt token 
    try {
      let decoded = decodeToken(token)
      yield put(authSuccess(token, decoded.username, decoded.roles))
    } catch (e) {
      yield put(authFailure({ response: { status: 403, statusText: `User not found (${response.problem})` } }))
    }
  } else {
    yield put(authFailure({ response: { status: response.status, statusText: `User not found (${response.problem})` } }))
  }
}

// attempts to signup
export function* signup(api, action) {
  const { username, password } = action.payload
  // make the call to the api
  const response = yield call(api.signup, username, password)

  if (response.ok) {
    const { token } = response.data
    // do data conversion here if needed
    // decode jwt token 
    try {
      let decoded = decodeToken(token)
      yield put(authSuccess(token, decoded.username, decoded.roles))
    } catch (e) {
      yield put(authFailure({ response: { status: 403, statusText: `User not found (${response.problem})` } }))
    }
  } else {
    yield put(authFailure({ response: { status: response.status, statusText: `User not found (${response.problem})` } }))
  }
}

export function* onSuccess() {
  yield put(routerPush('/'))
}

export function* logout() {
  yield put(purge())
}