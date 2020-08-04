import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import Provider from 'store';
import usePlayers from '../';

const setup = () => {
	localStorage.removeItem('data');

	const wrapper = ({ children }) => <Provider>{children}</Provider>;
	const { result } = renderHook(() => usePlayers(), { wrapper });

	return {
		result,
	};
};

const testNextTurn = (result, playersTurn, points) => {
	act(() => {
		result.current.handleAddPoint(playersTurn, points);
	});

	return result.current.playersTurn.name;
};

it('handle add player', () => {
	const { result } = setup();

	act(() => {
		result.current.handleAdd('Player 1', false);
		result.current.handleAdd('Player 2', true);
	});

	expect(result.current.players).toHaveLength(2);
	expect(result.current.players[0].name).toBe('Player 1');
	expect(result.current.players[0].handicap).toBe(false);
	expect(result.current.players[0].points).toHaveLength(0);
	expect(result.current.players[0].lastTurn).toBe(false);
	expect(result.current.players[0].currentPoints).toBe(0);
	expect(result.current.players[0].disqualified).toBe(false);
	expect(result.current.players[0].winner).toBe(false);
	expect(result.current.players[0].finishedPos).toBe(0);

	expect(result.current.players[1].name).toBe('Player 2');
	expect(result.current.players[1].handicap).toBe(true);
});

it('handle delete player', () => {
	const { result } = setup();

	act(() => {
		result.current.handleAdd('Player 1', false);
		result.current.handleAdd('Player 2', true);
	});

	expect(result.current.players).toHaveLength(2);
	expect(result.current.players[0].name).toBe('Player 1');
	expect(result.current.players[1].name).toBe('Player 2');

	act(() => {
		result.current.handleDelete('Player 1');
	});

	expect(result.current.players).toHaveLength(1);
	expect(result.current.players[0].name).toBe('Player 2');
});

it('handle add points', () => {
	const { result } = setup();

	act(() => {
		result.current.handleAdd('Player 1', false);
		result.current.handleAdd('Player 2', true);
	});

	expect(result.current.players).toHaveLength(2);
	expect(result.current.players[0].points).toHaveLength(0);
	expect(result.current.players[1].points).toHaveLength(0);

	act(() => {
		result.current.handleAddPoint('Player 1', 12);
		result.current.handleAddPoint('Player 2', 5);
	});

	expect(result.current.players[0].points).toHaveLength(1);
	expect(result.current.players[1].points).toHaveLength(1);
	expect(result.current.players[0].points[0]).toBe(12);
	expect(result.current.players[1].points[0]).toBe(5);
});

it('handle new game', () => {
	const { result } = setup();

	act(() => {
		result.current.handleAdd('Player 1', false);
		result.current.handleAdd('Player 2', true);
	});

	expect(result.current.players).toHaveLength(2);

	act(() => {
		result.current.handleNewGame();
	});

	expect(result.current.players).toHaveLength(0);
});

it('handle shuffle', () => {
	const { result } = setup();

	act(() => {
		result.current.handleAdd('Player 1', false);
		result.current.handleAdd('Player 2', true);
		result.current.handleAdd('Player 3', false);
		result.current.handleAdd('Player 4', false);
		result.current.handleAdd('Player 5', false);
	});

	expect(result.current.players).toHaveLength(5);

	act(() => {
		result.current.handleShuffle();
	});

	expect(result.current.players).toHaveLength(5);
});

it.skip('sorts players after points and then disqualified', () => {});

it('shows whose turn it is', () => {
	const { result } = setup();

	act(() => {
		result.current.handleAdd('Player 1', false);
		result.current.handleAdd('Player 2', true);
		result.current.handleAdd('Player 3', false);
		result.current.handleAdd('Player 4', false);
	});

	expect(result.current.players).toHaveLength(4);
	expect(result.current.playersTurn.name).toBe('Player 1');

	expect(testNextTurn(result, 'Player 1', 9)).toBe('Player 2');
	expect(testNextTurn(result, 'Player 2', 4)).toBe('Player 3');
	expect(testNextTurn(result, 'Player 3', 8)).toBe('Player 4');
	expect(testNextTurn(result, 'Player 4', 6)).toBe('Player 2');

	expect(testNextTurn(result, 'Player 2', 6)).toBe('Player 4');
	expect(testNextTurn(result, 'Player 4', 6)).toBe('Player 3');
	expect(testNextTurn(result, 'Player 3', 6)).toBe('Player 1');
});

it.skip('should select players turn by finished, disqualified, round and lowest point', () => {});

it.skip('should sort score by finished, disqualified, round and lowest point', () => {});
