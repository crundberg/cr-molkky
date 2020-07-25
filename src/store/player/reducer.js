import * as PLAYER from './types';

export const initialState = [];

export default function players(state = initialState, action) {
	switch (action.type) {
		case PLAYER.ADD:
			return [
				...state,
				{
					name: action.payload.name,
					handicap: action.payload.handicap,
					points: [],
					lastTurn: false,
					currentPoints: 0,
					misses: 0,
					disqualified: false,
					winner: false
				}
			]
		case PLAYER.DELETE:
			return state.filter(player => player.name !== action.payload.name)
		case PLAYER.ADD_POINT:
			const players = state.map(player => {
				if (player.name === action.payload.name) {
					player.points.push(action.payload.points);
					player.currentPoints += action.payload.points;
					player.lastTurn = true;

					if (player.currentPoints === 50)
						player.winner = true;
					else if (player.currentPoints > 50)
						player.currentPoints = 25;

					if (action.payload.points === 0)
						player.misses++;
					else
						player.misses = 0;

					if (player.misses >= 3 && !player.handicap)
						player.disqualified = true;

					return player;
				}

				player.lastTurn = false;

				return player;
			})

			return players;
		case PLAYER.NEW_GAME:
			return initialState;
		default:
			return state;
	}
}