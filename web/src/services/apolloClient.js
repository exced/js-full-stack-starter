/**
 *
 * @flow
 */

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { getToken, clear } from './storage';

export const createClient = () => {
	const httpLink = createHttpLink({
		uri: process.env.REACT_APP_API_URI || 'http://localhost:4000/',
	});

	const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
		if (networkError) {
		}

		if (graphQLErrors) {
			for (let err of graphQLErrors) {
				if (err.extensions.code === 'UNAUTHENTICATED') {
					clear();
					if (!err.path.includes('login') && !err.path.includes('signup')) {
						window.location.href = '/';
					}
				}
			}
		}
	});

	const authLink = setContext((_, { headers }) => {
		const token = getToken();
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		};
	});

	return new ApolloClient({
		link: authLink.concat(errorLink).concat(httpLink),
		cache: new InMemoryCache({ dataIdFromObject: object => object.id || null }),
	});
};
