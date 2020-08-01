import * as PLAYER from './types';

export const initialState = {
	rounds: 0,
	throws: 0,
	finished: 0,
	players: [],
};

export default function players(state = initialState, action) {
	switch (action.type) {
		case PLAYER.ADD:
			return {
				...state,
				players: [...state.players, action.payload],
			};
		case PLAYER.DELETE:
			return {
				...state,
				players: state.players.filter(
					(player) => player.name !== action.payload.name
				),
			};
		case PLAYER.ADD_POINT:
			const players = state.players.map((player, _index, array) => {
				if (player.name === action.payload.name) {
					player.points.push(action.payload.points);
					player.currentPoints += action.payload.points;
					player.lastTurn = true;

					if (player.currentPoints === 50 && player.finishedPos === 0) {
						player.winner = true;

						player.finishedPos =
							array.filter((x) => x.finishedPos > 0).length + 1;
					} else if (player.currentPoints > 50) player.currentPoints = 25;

					if (action.payload.points === 0) player.misses++;
					else player.misses = 0;

					if (player.misses >= 3 && !player.handicap)
						player.disqualified = true;

					return player;
				}

				player.lastTurn = false;

				return player;
			});

			return {
				...state,
				throws: state.throws++,
				rounds: state.throws % state.players.length,
				players: players,
			};
		case PLAYER.NEW_GAME:
			return initialState;
		case PLAYER.SHUFFLE:
			return {
				...state,
				players: state.players.sort(() => {
					return 0.5 - Math.random();
				}),
			};
		default:
			return state;
	}
}
