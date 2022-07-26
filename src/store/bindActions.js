export default function bindActions(actions, dispatch) {
	const bindAction = (action, bindDispatch) => {
		return (...args) => {
			return bindDispatch(action(...args));
		};
	};

	// if it's a single action
	if (typeof actions === 'function') {
		return bindAction(actions, dispatch);
	}
	if (typeof actions !== 'object' || actions === null) {
		throw new Error(
			`bindActions expected an object or a function, instead received ${
				actions === null ? 'null' : typeof actions
			}. `
		);
	}
	const boundActions = {};
	Object.entries(actions).forEach(([key, action]) => {
		if (typeof action === 'function') {
			boundActions[key] = bindAction(action, dispatch);
		}
	});

	return boundActions;
}
