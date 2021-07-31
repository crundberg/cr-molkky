import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from 'store';
import Game from '../game';

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
	setup(initialData());
});

it('use initial state if a new version is released', () => {
	const data = JSON.stringify({
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
			],
		},
		version: 'oldVersion',
	});

	const version = process.env.REACT_APP_VERSION;
	process.env.REACT_APP_VERSION = 'newVersion';

	setup(data);

	process.env.REACT_APP_VERSION = version;
});

it('redirects to start when new game button is pressed', () => {
	const jsdomAlert = window.confirm;
	window.confirm = () => {
		return true;
	};

	const { ...screen } = setup(initialData());

	const btnNewGame = screen.getByText('New game');
	fireEvent.click(btnNewGame);

	window.confirm = jsdomAlert;
});

it('does not redirects to start when new game button is pressed and cancel is pressed', () => {
	const jsdomAlert = window.confirm;
	window.confirm = () => {
		return false;
	};

	const { ...screen } = setup(initialData());

	const btnNewGame = screen.getByText('New game');
	fireEvent.click(btnNewGame);

	window.confirm = jsdomAlert;
});

it('clear all players points when restart game button is pressed', () => {
	const jsdomAlert = window.confirm;
	window.confirm = () => {
		return true;
	};

	const { ...screen } = setup(initialData());

	const btnRestart = screen.getByText('Restart game');
	fireEvent.click(btnRestart);

	window.confirm = jsdomAlert;
});

it('does not clear all players points when restart game button is pressed and cancel is pressed', () => {
	const jsdomAlert = window.confirm;
	window.confirm = () => {
		return false;
	};

	const { ...screen } = setup(initialData());

	const btnRestart = screen.getByText('Restart game');
	fireEvent.click(btnRestart);

	window.confirm = jsdomAlert;
});

it('redirects to settings when settings button is pressed', () => {
	const jsdomAlert = window.confirm;
	window.confirm = () => {
		return true;
	};

	const { ...screen } = setup(initialData());

	const btnSettings = screen.getByText('Settings');
	fireEvent.click(btnSettings);

	window.confirm = jsdomAlert;
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
	const { ...screen } = setup(initialData());

	const btnPoints = screen.getAllByTestId(/btnPoint/);
	expect(btnPoints.length).toBe(13);

	btnPoints.map((btn) => {
		expect(btn).toHaveClass('btn-outline-primary');
		fireEvent.click(btn);
		expect(btn).toHaveClass('btn-primary');

		return btn;
	});
});

it('is not possible to add points if point button is not selected', () => {
	const { ...screen } = setup(initialData());
	const btnAdd = screen.getByTestId('btnAdd');
	expect(btnAdd).toBeDisabled();

	const btnPoints = screen.getByTestId('btnPoint6');
	fireEvent.click(btnPoints);
	expect(btnAdd).toBeEnabled();
});

it('should update add points button with selected points', () => {
	const { ...screen } = setup(initialData());
	const btnAdd = screen.getByTestId('btnAdd');

	const btnPoint6 = screen.getByTestId('btnPoint6');
	fireEvent.click(btnPoint6);
	expect(btnAdd).toBeEnabled();
	expect(btnAdd).toHaveTextContent('OK (+6)');

	const btnPoint0 = screen.getByTestId('btnPoint0');
	fireEvent.click(btnPoint0);
	expect(btnAdd).toBeEnabled();
	expect(btnAdd).toHaveTextContent('Missed');

	fireEvent.click(btnAdd);
	expect(btnAdd).toBeDisabled();
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
