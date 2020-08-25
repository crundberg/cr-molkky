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
			const newPlayer = player;
			newPlayer.points.push(action.payload.points);
			newPlayer.currentPoints = calcPlayerScore(newPlayer);
			newPlayer.disqualified = calcPlayerDisqualified(newPlayer);

			if (newPlayer.currentPoints === 50 && newPlayer.finishedPos === 0) {
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
				players: state.players.map((player) => {
					const newPlayer = player;
					newPlayer.points = [];
					newPlayer.currentPoints = 0;
					newPlayer.misses = 0;
					newPlayer.disqualified = false;
					newPlayer.finishedPos = 0;

					return newPlayer;
				}),
			};
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
