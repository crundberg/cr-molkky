import { useGlobalStore } from 'store';
import bindActions from 'store/bindActions';
import storeReducer from 'store/player';

const { actions } = storeReducer;

const usePlayers = () => {
	const { state, dispatch } = useGlobalStore();

	// List of Props
	const { players } = state;

	// List of Actions
	const { handleAdd, handleDelete, handleAddPoint, handleNewGame } = actions;

	// Bind Actions
	const playerActions = bindActions(
		{
			handleAdd,
			handleDelete,
			handleAddPoint,
			handleNewGame,
		},
		dispatch
	);

	// Functions
	const playersTurn = players.reduce((turn, player) => {
		const turnLength = turn.points.length;
		const playerLength = player.points.length;

		if (player.disqualified) return turn;
		else if (turnLength > playerLength) return player;
		else if (turnLength < playerLength) return turn;
		else if (player.currentPoints < turn.currentPoints) return player;

		return turn;
	}, players[0]);

	const sortScore = (a, b) => {
		var comparison = 0;

		if (!a.disqualified && b.disqualified) {
			comparison = -1;
		} else if (a.disqualified && !b.disqualified) {
			comparison = 1;
		} else if (a.currentPoints > b.currentPoints) {
			comparison = -1;
		} else if (a.currentPoints < b.currentPoints) {
			comparison = 1;
		}

		return comparison;
	};

	return { players, playersTurn, sortScore, ...playerActions };
};

export default usePlayers;
