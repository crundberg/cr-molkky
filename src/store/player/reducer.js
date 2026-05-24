import {
	calcPlayerScore,
	calcPlayerDisqualified,
} from 'hooks/usePlayers/utils';

import * as PLAYER_TYPE from './types';

export const initialState = {
	players: [],
};

export const addPointsReducer = (state, action) => {
	return state.players.map((player, _index, array) => {
		if (player.name === action.payload.name) {
			const newPoints = [...player.points, action.payload.points];
			const newPlayer = { ...player, points: newPoints };
			newPlayer.currentPoints = calcPlayerScore(newPlayer);
			newPlayer.disqualified = calcPlayerDisqualified(newPlayer);

			if (newPlayer.currentPoints === 50 && player.finishedPos === 0) {
				newPlayer.finishedPos =
					array.filter((x) => x.finishedPos > 0).length + 1;
			}

			return newPlayer;
		}

		return player;
	});
};

export default function players(state = initialState, action) {
	switch (action.type) {
		case PLAYER_TYPE.ADD:
			return {
				...state,
				players: [...state.players, action.payload],
			};
		case PLAYER_TYPE.DELETE:
			return {
				...state,
				players: state.players.filter(
					(player) => player.name !== action.payload.name
				),
			};
		case PLAYER_TYPE.ADD_POINT:
			return {
				...state,
				players: addPointsReducer(state, action),
			};
		case PLAYER_TYPE.NEW_GAME:
			return initialState;
		case PLAYER_TYPE.REMATCH:
			return {
				...state,
				players: state.players.map((player) => ({
					...player,
					points: [],
					currentPoints: 0,
					misses: 0,
					disqualified: false,
					finishedPos: 0,
				})),
			};
		case PLAYER_TYPE.UNDO_POINT: {
			const maxThrows = Math.max(
				0,
				...state.players.map((p) => p.points.length)
			);
			if (maxThrows === 0) return state;

			let lastPlayerIndex = -1;
			for (let i = state.players.length - 1; i >= 0; i -= 1) {
				if (state.players[i].points.length === maxThrows) {
					lastPlayerIndex = i;
					break;
				}
			}

			return {
				...state,
				players: state.players.map((player, index) => {
					if (index !== lastPlayerIndex) return player;
					const newPoints = player.points.slice(0, -1);
					const newPlayer = { ...player, points: newPoints };
					newPlayer.currentPoints = calcPlayerScore(newPlayer);
					newPlayer.disqualified = calcPlayerDisqualified(newPlayer);
					newPlayer.finishedPos = 0;
					return newPlayer;
				}),
			};
		}
		case PLAYER_TYPE.SHUFFLE:
			return {
				...state,
				players: state.players
					.map((a) => [Math.random(), a])
					.sort((a, b) => a[0] - b[0])
					.map((a) => a[1]),
			};
		default:
			return state;
	}
}
