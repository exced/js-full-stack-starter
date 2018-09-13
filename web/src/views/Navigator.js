/**
 * @flow
 */

import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import App from './App';
import { getToken } from '../services/storage';

const NotFound = () => {
	const token = getToken();
	return !!token ? <Redirect to={{ pathname: '/' }} /> : <Redirect to={{ pathname: '/login' }} />;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
	const token = getToken();
	return (
		<Route
			{...rest}
			render={props =>
				!!token ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				)
			}
		/>
	);
};

const Navigation = () => (
	<Switch>
		<Route exact path="/login" component={LoginPage} />
		<Route exact path="/signup" component={SignupPage} />
		<PrivateRoute path="/" component={App} />
		<Route component={NotFound} />
	</Switch>
);

export default Navigation;
