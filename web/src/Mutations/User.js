/**
 * @flow
 */

import gql from 'graphql-tag';

export const login = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`;

export const signup = gql`
	mutation signup($email: String!, $password: String!) {
		signup(email: $email, password: $password) {
			token
		}
	}
`;
