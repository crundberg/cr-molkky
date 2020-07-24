import * as PLAYER from './types';

function addPlayer(name, handicap) {
	return {
		type: PLAYER.ADD,
		payload: {
			name,
			handicap
		}
	};
}

function deletePlayer(name) {
	return {
		type: PLAYER.DELETE,
		payload: {
			name
		}
	};
}

export function handleAdd(name, handicap) {
	return async function (dispatch) {
		dispatch(addPlayer(name, handicap));
	};
}

export function handleDelete(name) {
	return async function (dispatch) {
		dispatch(deletePlayer(name));
	};
}