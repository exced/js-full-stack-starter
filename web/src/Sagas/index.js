import { takeLatest, all } from 'redux-saga/effects'
import createAPI from '../Services/Api'
import { SIGNUP_REQUEST, SIGNIN_REQUEST, AUTH_SUCCESS, LOGOUT } from '../Types/Auth'
import { signin, logout, signup, onSuccess } from '../Sagas/Auth'

const api = createAPI()

export default function* root() {
  yield all([
    // Auth
    takeLatest(SIGNIN_REQUEST, signin, api),
    takeLatest(SIGNUP_REQUEST, signup, api),
    takeLatest(LOGOUT, logout),
    takeLatest(AUTH_SUCCESS, onSuccess),
  ])
}