import * as PLAYER from './types';

export function handleAdd(name, handicap) {
	return {
		type: PLAYER.ADD,
		payload: {
			name: name,
			handicap: handicap,
			points: [],
			currentPoints: 0,
			misses: 0,
			disqualified: false,
			finishedPos: 0,
		},
	};
}

export function handleDelete(name) {
	return {
		type: PLAYER.DELETE,
		payload: {
			name,
		},
	};
}

export function handleAddPoint(name, points) {
	return {
		type: PLAYER.ADD_POINT,
		payload: {
			name,
			points,
		},
	};
}

export function handleNewGame() {
	return {
		type: PLAYER.NEW_GAME,
	};
}

export function handleRematch() {
	return {
		type: PLAYER.REMATCH,
	};
}

export function handleShuffle() {
	return {
		type: PLAYER.SHUFFLE,
	};
}
