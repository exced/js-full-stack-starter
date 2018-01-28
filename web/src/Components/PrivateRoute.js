import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ isLoggedIn, roles, whiteList, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn && roles.some(r => whiteList.includes(r))
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
    }
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  roles: PropTypes.array.isRequired,
}

export default PrivateRoute
