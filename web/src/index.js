/**
 * @flow
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import 'antd/dist/antd.css';

import './assets/index.css';
import { createClient } from './services/apolloClient';
import Navigator from './views/Navigator';
import registerServiceWorker from './registerServiceWorker';

const apolloClient = createClient();

ReactDOM.render(
	<ApolloProvider client={apolloClient}>
		<Router>
			<Navigator />
		</Router>
	</ApolloProvider>,
	document.getElementById('root')
);
registerServiceWorker();
