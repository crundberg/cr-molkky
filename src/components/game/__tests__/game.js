import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from 'store';
import Game from '../game';

const data = () => {
	return JSON.stringify({
		players: [
			{
				name: 'Player 1',
				handicap: false,
				points: [],
				lastTurn: false,
				currentPoints: 0,
				misses: 0,
				disqualified: false,
				winner: false,
			},
			{
				name: 'Player 2',
				handicap: false,
				points: [],
				lastTurn: false,
				currentPoints: 0,
				misses: 0,
				disqualified: false,
				winner: false,
			},
			{
				name: 'Player 3',
				handicap: true,
				points: [],
				lastTurn: false,
				currentPoints: 0,
				misses: 0,
				disqualified: false,
				winner: false,
			},
		],
	});
};

const setup = (data) => {
	if (data) localStorage.setItem('data', data);
	else localStorage.removeItem('data');

	const history = createMemoryHistory();
	const screen = render(
		<Provider>
			<Router history={history}>
				<Game />
			</Router>
		</Provider>
	);

	return {
		...screen,
	};
};

it('renders without crashing', () => {
	setup(data());
});

it('redirects to start when new game button is pressed', () => {
	const { ...screen } = setup(data());

	const btnNewGame = screen.getByText('New game');
	fireEvent.click(btnNewGame);
});

it('redirects to settings when settings button is pressed', () => {
	const { ...screen } = setup(data());

	const btnSettings = screen.getByText('Settings');
	fireEvent.click(btnSettings);
});

it.skip('sorts players after points and then disqualified', () => {
	setup();
});

it.skip('shows current points and misses for each player', () => {
	setup();
});

it.skip('shows whose turn it is', () => {
	setup();
});

it('is possible to press point buttons', () => {
	const { ...screen } = setup(data());

	const btnPoints = screen.getAllByTestId(/btnPoint/);
	expect(btnPoints.length).toBe(13);

	btnPoints.map((btn) => {
		expect(btn).toHaveClass('btn-outline-primary');
		fireEvent.click(btn);
		expect(btn).toHaveClass('btn-primary');
	});
});

it('is not possible to add points if point button is not selected', () => {
	const { ...screen } = setup(data());
	const btnAdd = screen.getByTestId('btnAdd');
	expect(btnAdd).toBeDisabled();

	var btnPoints = screen.getByTestId('btnPoint6');
	fireEvent.click(btnPoints);
	expect(btnAdd).toBeEnabled();
});

it('should update add points button with selected points', () => {
	const { ...screen } = setup(data());
	const btnAdd = screen.getByTestId('btnAdd');

	var btnPoints = screen.getByTestId('btnPoint6');
	fireEvent.click(btnPoints);
	expect(btnAdd).toBeEnabled();
	expect(btnAdd).toHaveTextContent('OK (+6)');

	btnPoints = screen.getByTestId('btnPoint0');
	fireEvent.click(btnPoints);
	expect(btnAdd).toBeEnabled();
	expect(btnAdd).toHaveTextContent('Missed');
});

it('should redirect to start if no players are found', () => {
	setup();
});

it.skip('should select players turn by finished, disqualified, round and lowest point', () => {
	setup();
});

it.skip('should sort score by finished, disqualified, round and lowest point', () => {
	setup();
});
