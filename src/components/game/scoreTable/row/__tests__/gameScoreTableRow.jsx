import React from 'react';
import { render } from '@testing-library/react';
import Provider from 'store';
import GameScoreTableRow from '../row';

const initialData = (players) => {
	return JSON.stringify({
		players: {
			players,
		},
		version: process.env.REACT_APP_VERSION,
	});
};

const setup = (data, player) => {
	if (data) localStorage.setItem('data', data);
	else localStorage.removeItem('data');

	const screen = render(
		<Provider>
			<table>
				<tbody>
					<GameScoreTableRow player={player} key={player.name} />
				</tbody>
			</table>
		</Provider>
	);

	return {
		...screen,
	};
};

it('renders without crashing', () => {
	const players = [
		{
			name: 'Player 1',
			handicap: false,
			points: [12, 0, null],
			currentPoints: 12,
			disqualified: false,
			finishedPos: 0,
		},
	];

	setup(initialData(players), players[0]);
});

it('should indicate players turn', () => {
	const players = [
		{
			name: 'Player 1',
			handicap: false,
			points: [12, 0, null],
			currentPoints: 12,
			disqualified: false,
			finishedPos: 0,
		},
	];

	const { ...screen } = setup(initialData(players), players[0]);

	const tr = screen.getByRole('row');
	expect(tr).toHaveClass('table-primary');
});

it('should not indicate another players turn', () => {
	const players = [
		{
			name: 'Player 1',
			handicap: false,
			points: [12, 0, null],
			currentPoints: 12,
			disqualified: false,
			finishedPos: 0,
		},
		{
			name: 'Player 2',
			handicap: false,
			points: [12, 0],
			currentPoints: 12,
			disqualified: false,
			finishedPos: 0,
		},
	];

	const { ...screen } = setup(initialData(players), players[0]);

	const tr = screen.getByRole('row');
	expect(tr).not.toHaveClass('table-primary');
});

it('should indicate player is disqualified', () => {
	const players = [
		{
			name: 'Player 1',
			handicap: false,
			points: [0, 0, 0],
			currentPoints: 0,
			disqualified: true,
			finishedPos: 0,
		},
	];

	const { ...screen } = setup(initialData(players), players[0]);

	const tr = screen.getByRole('row');
	expect(tr).toHaveClass('table-disqualified');
});

it('should not indicate player is not disqualified', () => {
	const players = [
		{
			name: 'Player 1',
			handicap: false,
			points: [0, 0, 12],
			currentPoints: 12,
			disqualified: false,
			finishedPos: 0,
		},
	];

	const { ...screen } = setup(initialData(players), players[0]);

	const tr = screen.getByRole('row');
	expect(tr).not.toHaveClass('table-disqualified');
});

it('should indicate player who finished', () => {
	const players = [
		{
			name: 'Player 1',
			handicap: false,
			points: [50],
			currentPoints: 50,
			disqualified: false,
			finishedPos: 0,
		},
	];

	const { ...screen } = setup(initialData(players), players[0]);

	const tr = screen.getByRole('row');
	expect(tr).toHaveClass('table-warning');
});

it('should not indicate player is not disqualified', () => {
	const players = [
		{
			name: 'Player 1',
			handicap: false,
			points: [0, 0, 12],
			currentPoints: 12,
			disqualified: false,
			finishedPos: 0,
		},
	];

	const { ...screen } = setup(initialData(players), players[0]);

	const tr = screen.getByRole('row');
	expect(tr).not.toHaveClass('table-warning');
});

it('should indicate if player has handicap', () => {
	const players = [
		{
			name: 'Player 1',
			handicap: true,
			points: [0, 0, 12],
			currentPoints: 12,
			disqualified: false,
			finishedPos: 0,
		},
	];

	const { ...screen } = setup(initialData(players), players[0]);

	const badge = screen.getByText('HCP');
	expect(badge).toHaveClass('badge', 'badge-warning');
});
