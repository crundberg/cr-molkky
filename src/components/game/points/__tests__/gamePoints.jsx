import React from 'react';
import { render } from '@testing-library/react';
import Provider from 'store';
import GamePoints from '../points';

const initialData = () => {
	return JSON.stringify({
		players: {
			players: [
				{
					name: 'Player 1',
					handicap: false,
					points: [],
					currentPoints: 0,
					disqualified: false,
					finishedPos: 0,
				},
				{
					name: 'Player 2',
					handicap: false,
					points: [],
					currentPoints: 0,
					disqualified: false,
					finishedPos: 0,
				},
				{
					name: 'Player 3',
					handicap: true,
					points: [],
					currentPoints: 0,
					disqualified: false,
					finishedPos: 0,
				},
			],
		},
		version: process.env.REACT_APP_VERSION,
	});
};

const setup = (data) => {
	if (data) localStorage.setItem('data', data);
	else localStorage.removeItem('data');

	const screen = render(
		<Provider>
			<GamePoints />
		</Provider>
	);

	return {
		...screen,
	};
};

it('renders without crashing', () => {
	setup(initialData());
});

it('do not render if there is no players left', () => {
	const data = JSON.stringify({
		players: {
			players: [],
		},
		version: 'oldVersion',
	});

	const { ...screen } = setup(data);
	const button = screen.queryByRole('button');
	expect(button).toBe(null);
});
