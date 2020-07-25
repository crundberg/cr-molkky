import { useGlobalStore } from 'store';
import bindActions from 'store/bindActions';
import storeReducer from 'store/player';

const { actions } = storeReducer;

const usePlayers = () => {
	const { state , dispatch } = useGlobalStore();

	// List of Props
	const {
		players
	} = state;

	// List of Actions
	const {
		handleAdd,
		handleDelete,
		handleAddPoint,
		handleNewGame
	} = actions;

	// Bind Actions
	const playerActions = bindActions({
		handleAdd,
		handleDelete,
		handleAddPoint,
		handleNewGame
	}, dispatch);

	return { players, ...playerActions };
}

export default usePlayers;