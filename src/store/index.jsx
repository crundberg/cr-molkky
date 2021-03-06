import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import mainReducer, { initialState } from './reducers';

const GlobalStore = createContext({});

export const useGlobalStore = () => useContext(GlobalStore);

export default function Provider({ children }) {
	const [state, dispatch] = useReducer(mainReducer, initialState, () => {
		const localData = localStorage.getItem('data');

		if (!localData) return initialState;

		const localJson = JSON.parse(localData);

		return process.env.REACT_APP_VERSION === localJson.version
			? localJson
			: initialState;
	});

	useEffect(() => {
		localStorage.setItem('data', JSON.stringify(state));
	}, [state]);

	return (
		<GlobalStore.Provider value={{ state, dispatch }}>
			{children}
		</GlobalStore.Provider>
	);
}

Provider.propTypes = {
	children: PropTypes.node.isRequired,
};
