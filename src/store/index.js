import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { asyncer } from './middlewares';
import mainReducer, { initialState } from './reducers';

const GlobalStore = createContext({});

export const useGlobalStore = () => useContext(GlobalStore);

export default function Provider({ children }) {
	const [ state, dispatchBase ] = useReducer(mainReducer, initialState, () => {
		//return initialState;

		const localData = localStorage.getItem('data');
		return localData ? JSON.parse(localData) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('data', JSON.stringify(state));
	}, [state]);

	const dispatch = useCallback(asyncer(dispatchBase, state), []);

	return (
		<GlobalStore.Provider value={{ state, dispatch }}>
			{children}
		</GlobalStore.Provider>
	);
}

Provider.propTypes = {
	children: PropTypes.node.isRequired
}