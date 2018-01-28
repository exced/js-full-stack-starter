import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from '../Containers/PrivateRoute'
import App from '../Containers/App'
import SigninPage from '../Containers/SigninPage'
import SignupPage from '../Containers/SignupPage'
import { Lists } from '../Types/Auth'

const NotFound = ({ isLoggedIn }) => isLoggedIn ? <Redirect to={{ pathname: '/' }} /> : <Redirect to={{ pathname: '/login' }} />

const Navigation = ({ isLoggedIn, roles }) => (
  <Switch>
    <Route exact path="/signin" component={SigninPage} />
    <Route exact path="/signup" component={SignupPage} />
    <PrivateRoute path="/" component={App} isLoggedIn={isLoggedIn} roles={roles} whiteList={Lists.all} />
    <Route component={NotFound} />
  </Switch>
)

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  roles: PropTypes.array.isRequired,
}

export default Navigation