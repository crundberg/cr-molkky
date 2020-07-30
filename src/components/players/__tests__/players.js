import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from 'store';
import Players from '../players';

const setup = () => {
	localStorage.removeItem('data');

	const history = createMemoryHistory();
	const screen = render(
		<Provider>
			<Router history={history}>
				<Players />
			</Router>
		</Provider>
	);

	const btnAdd = screen.getByText('+');
	const btnHcp = screen.getByText('Handicap');
	const inputName = screen.getByLabelText('player');
	const listPlayers = screen.getByRole('list');

	return {
		btnAdd,
		btnHcp,
		inputName,
		listPlayers,
		...screen,
	};
};

it('renders without crashing', () => {
	setup();
});

it('is not possible to add player without name', () => {
	const { btnAdd, inputName } = setup();

	expect(btnAdd).toBeDisabled();
	fireEvent.change(inputName, { target: { value: 'Player 1' } });
	expect(btnAdd).toBeEnabled();
});

it('is not possible to add player is name alredy exists', () => {
	const { btnAdd, inputName } = setup();

	expect(btnAdd).toBeDisabled();
	fireEvent.change(inputName, { target: { value: 'Player 1' } });
	expect(btnAdd).toBeEnabled();
	fireEvent.click(btnAdd);
	expect(btnAdd).toBeDisabled();
	fireEvent.change(inputName, { target: { value: 'Player' } });
	expect(btnAdd).toBeEnabled();
	fireEvent.change(inputName, { target: { value: 'Player 1' } });
	expect(btnAdd).toBeDisabled();
});

it('is possible to toggle handicap', () => {
	const { btnHcp } = setup();

	expect(btnHcp).toHaveClass('btn-outline-secondary');
	fireEvent.click(btnHcp);
	expect(btnHcp).toHaveClass('btn-secondary');
	fireEvent.click(btnHcp);
	expect(btnHcp).toHaveClass('btn-outline-secondary');
});

it('is possible to add player', () => {
	const { listPlayers, btnAdd, inputName } = setup();

	fireEvent.change(inputName, { target: { value: 'Player 1' } });
	fireEvent.click(btnAdd);
	expect(listPlayers).toHaveTextContent('Player 1');
});

it('is possible to add player with handicap', () => {
	const { listPlayers, btnAdd, btnHcp, inputName } = setup();

	fireEvent.change(inputName, { target: { value: 'Player 1' } });
	fireEvent.click(btnHcp);
	fireEvent.click(btnAdd);
	expect(listPlayers).toHaveTextContent('Player 1');
	expect(listPlayers).toHaveTextContent('Handicap');
});

it('is possible to delete a player', () => {
	const { btnAdd, inputName, ...screen } = setup();

	fireEvent.change(inputName, { target: { value: 'Player 1' } });
	fireEvent.click(btnAdd);

	const btnDelete = screen.getByText('Delete');
	fireEvent.click(btnDelete);
});

it('is possible to shuffle players', () => {
	const { ...screen } = setup();

	const btnShuffle = screen.getByText('Shuffle');
	fireEvent.click(btnShuffle);
});
