import { useGlobalStore } from 'store';
import bindActions from 'store/bindActions';
import storeReducer from 'store/player';

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
		shuffle,
	} = actions;

	// Bind Actions
	const playerActions = bindActions(
		{
			handleAdd,
			handleDelete,
			handleAddPoint,
			handleNewGame,
			shuffle,
		},
		dispatch
	);

	// Functions
	const playersTurn = players
		.filter((player) => !player.winner && !player.disqualified)
		.reduce((turn, player) => {
			if (!turn.points) return player;

			const turnLength = turn.points.length;
			const playerLength = player.points.length;

			if (turnLength > playerLength) return player;
			else if (turnLength < playerLength) return turn;
			else if (player.currentPoints < turn.currentPoints) return player;

			return turn;
		}, {});

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
