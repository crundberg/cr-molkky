import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from 'store';
import Settings from '../settings';

const setup = () => {
	localStorage.removeItem('data');

	const history = createMemoryHistory();
	const screen = render(
		<Provider>
			<Router history={history}>
				<Settings />
			</Router>
		</Provider>
	);

	return {
		...screen,
	};
};

it('renders without crashing', () => {
	setup();
});
