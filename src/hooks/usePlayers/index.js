import { useGlobalStore } from 'store';
import bindActions from 'store/bindActions';
import storeReducer from 'store/player';
import {
	isPlayerLeft,
	getCurrentRound,
	isNewRound,
	getRoundColumns,
	getPlayersTurn,
	getPlayersByScore,
} from './utils';

const { actions } = storeReducer;

const usePlayers = () => {
	const { state, dispatch } = useGlobalStore();

	// List of Props
	const { players } = state.players;

	// List of Actions
	const {
		handleAdd,
		handleDelete,
		handleAddPoint,
		handleNewGame,
		handleRematch,
		handleShuffle,
		handleUndoPoint,
	} = actions;

	// Bind Actions
	const playerActions = bindActions(
		{
			handleAdd,
			handleDelete,
			handleAddPoint,
			handleNewGame,
			handleRematch,
			handleShuffle,
			handleUndoPoint,
		},
		dispatch
	);

	const playersLeft = players.filter(isPlayerLeft);
	const currentRound = getCurrentRound(players);
	const newRound = isNewRound(players, currentRound);
	const roundColumns = getRoundColumns(currentRound, newRound);
	const playersTurn = getPlayersTurn(players);
	const playersByScore = getPlayersByScore(players, newRound);

	const canUndo = players.some((p) => p.points.length > 0);

	return {
		players,
		playersLeft,
		playersTurn,
		playersByScore,
		currentRound,
		newRound,
		roundColumns,
		canUndo,
		...playerActions,
	};
};

export default usePlayers;
