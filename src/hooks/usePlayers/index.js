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
		handleShuffle,
	} = actions;

	// Bind Actions
	const playerActions = bindActions(
		{
			handleAdd,
			handleDelete,
			handleAddPoint,
			handleNewGame,
			handleShuffle,
		},
		dispatch
	);

	// Functions
	const playersLeft = players.filter(
		(player) => !player.winner && !player.disqualified
	);

	const currentRound = players.reduce((rounds, player) => {
		if (player.points.length > rounds) return player.points.length;

		return rounds;
	}, 1);

	const newRound = playersLeft.every((player) => {
		return player.points.length === currentRound;
	});

	const roundColumns = () => {
		if (currentRound < 4) {
			return [1, 2, 3, 4];
		}

		var columns = [];
		var roundToShow = newRound ? currentRound + 1 : currentRound;

		for (var round = roundToShow - 3; round <= roundToShow; round++) {
			columns.push(round);
		}

		return columns;
	};

	const playersTurn = playersLeft.reduce((turn, player) => {
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

		if (!newRound) return 0; // Sort after a complete round

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

	return {
		players,
		playersLeft,
		playersTurn,
		sortScore,
		currentRound,
		newRound,
		roundColumns,
		...playerActions,
	};
};

export default usePlayers;
