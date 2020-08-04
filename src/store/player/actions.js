import * as PLAYER from './types';

function addPlayer(name, handicap) {
	return {
		type: PLAYER.ADD,
		payload: {
			name: name,
			handicap: handicap,
			points: [],
			lastTurn: false,
			currentPoints: 0,
			misses: 0,
			disqualified: false,
			winner: false,
			finishedPos: 0,
		},
	};
}

function deletePlayer(name) {
	return {
		type: PLAYER.DELETE,
		payload: {
			name,
		},
	};
}

function addPoint(name, points) {
	return {
		type: PLAYER.ADD_POINT,
		payload: {
			name,
			points,
		},
	};
}

function newGame() {
	return {
		type: PLAYER.NEW_GAME,
		payload: {},
	};
}

export function handleAdd(name, handicap) {
	return function (dispatch) {
		dispatch(addPlayer(name, handicap));
	};
}

export function handleDelete(name) {
	return function (dispatch) {
		dispatch(deletePlayer(name));
	};
}

export function handleAddPoint(name, point) {
	return function (dispatch) {
		dispatch(addPoint(name, point));
	};
}

export function handleNewGame() {
	return function (dispatch) {
		dispatch(newGame());
	};
}

export function handleShuffle() {
	return function (dispatch) {
		dispatch({
			type: PLAYER.SHUFFLE,
		});
	};
}
