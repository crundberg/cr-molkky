import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from 'store';
import Start from '../start';

const setup = () => {
	localStorage.removeItem('data');

	const history = createMemoryHistory();
	const screen = render(
		<Provider>
			<Router history={history}>
				<Start />
			</Router>
		</Provider>
	);

	const btnStart = screen.getByText('Start game');

	return {
		btnStart,
		...screen,
	};
};

it('renders without crashing', () => {
	setup();
});
