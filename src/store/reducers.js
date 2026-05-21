import playerReducer from './player';

import { logger } from './middlewares';

export const initialState = {
	players: playerReducer.initialState,
	version: import.meta.env.VITE_APP_VERSION,
};

export default function mainReducer(state, action) {
	// Receiving previous state here
	const { players } = state;

	// Receiving current state here
	const currentState = {
		players: playerReducer.reducer(players, action),
		version: import.meta.env.VITE_APP_VERSION,
	};

	// Middlewares
	logger(action, state, currentState);

	return currentState;
}
