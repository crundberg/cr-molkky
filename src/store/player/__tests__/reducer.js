import Reducer from '../reducer';
import * as PLAYER from '../types';

it('should return the initial state', () => {
	const players = Reducer(undefined, {});

	expect(players.finished).toBe(0);
	expect(players.players).toHaveLength(0);
});

it('should handle add player', () => {
	// Add player 1
	let players = Reducer(undefined, {
		type: PLAYER.ADD,
		payload: {
			name: 'Player 1',
		},
	});

	expect(players.players).toHaveLength(1);
	expect(players.players[0].name).toBe('Player 1');

	// Add player 2
	players = Reducer(
		{
			players: [{ name: 'Player 1' }],
		},
		{
			type: PLAYER.ADD,
			payload: {
				name: 'Player 2',
			},
		}
	);

	expect(players.players).toHaveLength(2);
	expect(players.players[0].name).toBe('Player 1');
	expect(players.players[1].name).toBe('Player 2');
});

it('should handle delete player', () => {
	const players = Reducer(
		{
			players: [
				{ name: 'Player 1' },
				{ name: 'Player 2' },
				{ name: 'Player 3' },
			],
		},
		{
			type: PLAYER.DELETE,
			payload: {
				name: 'Player 2',
			},
		}
	);

	expect(players.players).toHaveLength(2);
	expect(players.players[0].name).toBe('Player 1');
	expect(players.players[1].name).toBe('Player 3');
});

describe('should handle add point', () => {
	it('should add point to player 1', () => {
		const players = Reducer(
			{
				players: [
					{
						name: 'Player 1',
						points: [],
						currentPoints: 0,
						finishedPos: 0,
						disqualified: false,
					},
					{
						name: 'Player 2',
						points: [],
						currentPoints: 0,
						finishedPos: 0,
						disqualified: false,
					},
					{
						name: 'Player 3',
						points: [],
						currentPoints: 0,
						finishedPos: 0,
						disqualified: false,
					},
				],
			},
			{
				type: PLAYER.ADD_POINT,
				payload: {
					name: 'Player 1',
					points: 12,
				},
			}
		);

		expect(players.players).toHaveLength(3);
		expect(players.players[0].name).toBe('Player 1');
		expect(players.players[1].name).toBe('Player 2');
		expect(players.players[2].name).toBe('Player 3');
		expect(players.players[0].points).toEqual([12]);
		expect(players.players[1].points).toEqual([]);
		expect(players.players[2].points).toEqual([]);
	});

	it('should handle finish first', () => {
		const players = Reducer(
			{
				players: [
					{
						name: 'Player 1',
						points: [0],
						currentPoints: 0,
						finishedPos: 0,
						disqualified: false,
					},
					{
						name: 'Player 2',
						points: [40],
						currentPoints: 40,
						finishedPos: 0,
						disqualified: false,
					},
					{
						name: 'Player 3',
						points: [20],
						currentPoints: 20,
						finishedPos: 0,
						disqualified: false,
					},
				],
			},
			{
				type: PLAYER.ADD_POINT,
				payload: {
					name: 'Player 2',
					points: 10,
				},
			}
		);

		expect(players.players[1].currentPoints).toBe(50);
		expect(players.players[1].finishedPos).toBe(1);
	});

	it('should handle finish second', () => {
		const players = Reducer(
			{
				players: [
					{
						name: 'Player 1',
						points: [50],
						currentPoints: 50,
						finishedPos: 1,
						disqualified: false,
					},
					{
						name: 'Player 2',
						points: [40],
						currentPoints: 40,
						finishedPos: 0,
						disqualified: false,
					},
					{
						name: 'Player 3',
						points: [20],
						currentPoints: 20,
						finishedPos: 0,
						disqualified: false,
					},
				],
			},
			{
				type: PLAYER.ADD_POINT,
				payload: {
					name: 'Player 2',
					points: 10,
				},
			}
		);

		expect(players.players[1].currentPoints).toBe(50);
		expect(players.players[1].finishedPos).toBe(2);
	});

	it('should handle overflow', () => {
		const players = Reducer(
			{
				players: [
					{
						name: 'Player 1',
						points: [0],
						currentPoints: 0,
						finishedPos: 0,
						disqualified: false,
					},
					{
						name: 'Player 2',
						points: [40],
						currentPoints: 40,
						finishedPos: 0,
						disqualified: false,
					},
					{
						name: 'Player 3',
						points: [20],
						currentPoints: 20,
						finishedPos: 0,
						disqualified: false,
					},
				],
			},
			{
				type: PLAYER.ADD_POINT,
				payload: {
					name: 'Player 2',
					points: 11,
				},
			}
		);

		expect(players.players[1].currentPoints).toBe(25);
	});

	it('should handle a miss', () => {
		Reducer(
			{
				players: [
					{
						name: 'Player 1',
						points: [0],
						currentPoints: 0,
						finishedPos: 0,
						disqualified: false,
					},
					{
						name: 'Player 2',
						points: [40],
						currentPoints: 40,
						finishedPos: 0,
						disqualified: false,
					},
					{
						name: 'Player 3',
						points: [20],
						currentPoints: 20,
						finishedPos: 0,
						disqualified: false,
					},
				],
			},
			{
				type: PLAYER.ADD_POINT,
				payload: {
					name: 'Player 2',
					points: 0,
				},
			}
		);
	});

	it('should handle disqualification after three misses', () => {
		const players = Reducer(
			{
				players: [
					{
						name: 'Player 1',
						points: [0, 1, 2],
						currentPoints: 3,
						finishedPos: 0,
						disqualified: false,
					},
					{
						name: 'Player 2',
						points: [0, 1, 2],
						currentPoints: 3,
						finishedPos: 0,
						disqualified: false,
					},
					{
						name: 'Player 3',
						points: [0, 0],
						currentPoints: 20,
						finishedPos: 0,
						disqualified: false,
					},
				],
			},
			{
				type: PLAYER.ADD_POINT,
				payload: {
					name: 'Player 3',
					points: 0,
				},
			}
		);

		expect(players.players[2].disqualified).toBe(true);
	});
});

it('should handle new game', () => {
	const players = Reducer(
		{
			players: [
				{
					name: 'Player 1',
					points: [0, 1, 2],
					currentPoints: 3,
					finishedPos: 0,
					disqualified: false,
				},
				{
					name: 'Player 2',
					points: [0, 1, 2],
					currentPoints: 3,
					finishedPos: 0,
					disqualified: false,
				},
				{
					name: 'Player 3',
					points: [0, 0],
					currentPoints: 20,
					finishedPos: 0,
					disqualified: false,
				},
			],
		},
		{
			type: PLAYER.NEW_GAME,
			payload: {},
		}
	);

	expect(players.finished).toBe(0);
	expect(players.players).toHaveLength(0);
});

it('should handle rematch', () => {
	const players = Reducer(
		{
			players: [
				{
					name: 'Player 1',
					points: [0, 1, 2],
					currentPoints: 3,
					finishedPos: 0,
					disqualified: false,
				},
				{
					name: 'Player 2',
					points: [0, 1, 2],
					currentPoints: 3,
					finishedPos: 0,
					disqualified: false,
				},
				{
					name: 'Player 3',
					points: [0, 0],
					currentPoints: 20,
					finishedPos: 0,
					disqualified: false,
				},
			],
		},
		{
			type: PLAYER.REMATCH,
			payload: {},
		}
	);

	expect(players.players).toHaveLength(3);

	for (let n = 0; n < 3; n += 1) {
		expect(players.players[n].points).toHaveLength(0);
		expect(players.players[n].currentPoints).toBe(0);
		expect(players.players[n].disqualified).toBe(false);
		expect(players.players[n].finishedPos).toBe(0);
	}
});

it('should handle shuffle', () => {
	const players = Reducer(
		{
			players: [
				{ name: 'Player 1' },
				{ name: 'Player 2' },
				{ name: 'Player 3' },
			],
		},
		{
			type: PLAYER.SHUFFLE,
			payload: {},
		}
	);

	expect(players.players).toHaveLength(3);
});
