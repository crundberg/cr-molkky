import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { handleNewGame } from 'store/player/actions';
import Provider from 'store';
import usePlayers from '..';

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
	expect(result.current.players[0].currentPoints).toBe(0);
	expect(result.current.players[0].disqualified).toBe(false);
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

it('should filter players who have finished or are disqualified', () => {
	const { result } = setup();

	// Add players
	act(() => {
		result.current.handleAdd('Player 1', false);
		result.current.handleAdd('Player 2', true);
		result.current.handleAdd('Player 3', false);
		result.current.handleAdd('Player 4', false);
	});

	expect(result.current.playersLeft).toHaveLength(4);

	act(() => {
		result.current.handleAddPoint('Player 1', 50);
	});

	expect(result.current.playersLeft).toHaveLength(3);

	act(() => {
		result.current.handleAddPoint('Player 3', 0);
		result.current.handleAddPoint('Player 3', 0);
		result.current.handleAddPoint('Player 3', 0);
	});

	expect(result.current.playersLeft).toHaveLength(2);
});

it('should calculate current round', () => {
	const { result } = setup();

	// Add players
	act(() => {
		result.current.handleAdd('Player 1', false);
		result.current.handleAdd('Player 2', true);
		result.current.handleAdd('Player 3', false);
		result.current.handleAdd('Player 4', false);
	});

	expect(result.current.currentRound).toBe(0);

	// Test round 1
	act(() => {
		result.current.handleAddPoint('Player 1', 50);
		result.current.handleAddPoint('Player 2', 10);
		result.current.handleAddPoint('Player 3', 0);
		result.current.handleAddPoint('Player 4', 5);
	});

	expect(result.current.currentRound).toBe(1);

	// Test round 2
	act(() => {
		result.current.handleAddPoint('Player 2', 10);
		result.current.handleAddPoint('Player 3', 0);
		result.current.handleAddPoint('Player 4', 5);
	});

	expect(result.current.currentRound).toBe(2);

	// Test round 3
	act(() => {
		result.current.handleAddPoint('Player 2', 10);
		result.current.handleAddPoint('Player 3', 0);
		result.current.handleAddPoint('Player 4', 5);
	});

	expect(result.current.currentRound).toBe(3);

	// Test round 4
	act(() => {
		result.current.handleAddPoint('Player 2', 10);
		result.current.handleAddPoint('Player 4', 5);
	});

	expect(result.current.currentRound).toBe(4);
});

it('should check if its a new round', () => {
	const { result } = setup();

	// Add players
	act(() => {
		result.current.handleAdd('Player 1', false);
		result.current.handleAdd('Player 2', true);
		result.current.handleAdd('Player 3', false);
		result.current.handleAdd('Player 4', false);
	});

	expect(result.current.newRound).toBe(true);

	act(() => {
		result.current.handleAddPoint('Player 1', 50);
		result.current.handleAddPoint('Player 2', 10);
		result.current.handleAddPoint('Player 3', 0);
	});

	expect(result.current.newRound).toBe(false);

	act(() => {
		result.current.handleAddPoint('Player 4', 5);
	});

	expect(result.current.newRound).toBe(true);

	act(() => {
		result.current.handleAddPoint('Player 2', 10);
	});

	expect(result.current.newRound).toBe(false);

	act(() => {
		result.current.handleAddPoint('Player 3', 0);
		result.current.handleAddPoint('Player 4', 5);
	});

	expect(result.current.newRound).toBe(true);
});

it('should calculate colums to show in scoreboard', () => {
	const { result } = setup();
	const { handleAdd, handleAddPoint } = result.current;

	// Add players
	act(() => {
		handleAdd('Player 1', false);
		handleAdd('Player 2', true);
	});

	expect(result.current.roundColumns).toEqual(
		expect.arrayContaining([1, 2, 3, 4])
	);

	act(() => {
		handleAddPoint('Player 1', 1);
		handleAddPoint('Player 2', 1);
		handleAddPoint('Player 1', 1);
		handleAddPoint('Player 2', 1);
		handleAddPoint('Player 1', 1);
		handleAddPoint('Player 2', 1);
		handleAddPoint('Player 1', 1);
		handleAddPoint('Player 2', 1);
	});

	expect(result.current.roundColumns).toEqual([2, 3, 4, 5]);

	act(() => {
		handleAddPoint('Player 1', 1);
	});

	expect(result.current.roundColumns).toEqual([2, 3, 4, 5]);

	act(() => {
		handleAddPoint('Player 2', 1);
	});

	expect(result.current.roundColumns).toEqual([3, 4, 5, 6]);
});

describe('sort players', () => {
	it('should only sort if its a new round', () => {
		const { result } = setup();
		const { handleAdd, handleAddPoint } = result.current;
		let sort;

		// Add players
		act(() => {
			handleAdd('Player 1', false);
			handleAdd('Player 2', false);
		});

		sort = result.current.playersByScore;
		expect(sort[0].name).toBe('Player 1');
		expect(sort[1].name).toBe('Player 2');

		// Round 1 starts
		act(() => {
			handleAddPoint('Player 1', 5);
		});

		sort = result.current.playersByScore;
		expect(sort[0].name).toBe('Player 1');
		expect(sort[1].name).toBe('Player 2');

		// Round 1 finished
		act(() => {
			handleAddPoint('Player 2', 10);
		});

		sort = result.current.playersByScore;
		expect(sort[0].name).toBe('Player 2');
		expect(sort[1].name).toBe('Player 1');
	});

	it('should sort disqualified at the bottom', () => {
		const { result } = setup();
		const { handleAdd, handleAddPoint } = result.current;
		let sort;

		// Add players
		act(() => {
			handleAdd('Player 1', false);
			handleAdd('Player 2', false);
			handleAddPoint('Player 1', 12);
			handleAddPoint('Player 2', 0);
			handleAddPoint('Player 1', 12);
			handleAddPoint('Player 2', 0);
			handleAddPoint('Player 1', 12);
			handleAddPoint('Player 2', 0);
		});

		sort = result.current.playersByScore;
		expect(sort[0].name).toBe('Player 1');
		expect(sort[1].name).toBe('Player 2');

		// Add players
		act(() => {
			handleNewGame();
			handleAdd('Player 1', false);
			handleAdd('Player 2', false);
			handleAddPoint('Player 1', 0);
			handleAddPoint('Player 2', 12);
			handleAddPoint('Player 1', 0);
			handleAddPoint('Player 2', 12);
			handleAddPoint('Player 1', 0);
			handleAddPoint('Player 2', 12);
		});

		sort = result.current.playersByScore;
		expect(sort[0].name).toBe('Player 1');
		expect(sort[1].name).toBe('Player 2');
	});

	it('should sort by points', () => {
		const { result } = setup();
		const { handleAdd, handleAddPoint } = result.current;
		let sort;

		act(() => {
			handleAdd('Player 1', false);
			handleAdd('Player 2', false);
			handleAddPoint('Player 1', 12);
			handleAddPoint('Player 2', 10);
		});

		sort = result.current.playersByScore;
		expect(sort[0].name).toBe('Player 1');
		expect(sort[1].name).toBe('Player 2');

		act(() => {
			handleAddPoint('Player 1', 9);
			handleAddPoint('Player 2', 12);
		});

		sort = result.current.playersByScore;
		expect(sort[0].name).toBe('Player 2');
		expect(sort[1].name).toBe('Player 1');
	});

	it('should do noting if equal', () => {
		const { result } = setup();
		const { handleAdd, handleAddPoint } = result.current;

		act(() => {
			handleAdd('Player 1', false);
			handleAdd('Player 2', false);
			handleAddPoint('Player 1', 12);
			handleAddPoint('Player 2', 12);
		});

		const sort = result.current.playersByScore;
		expect(sort[0].name).toBe('Player 1');
		expect(sort[1].name).toBe('Player 2');
	});
});

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
