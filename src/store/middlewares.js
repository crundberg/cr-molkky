/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

export const logger = (action, prevState, currentState) => {
	if (process.env.NODE_ENV !== 'development') return;

	console.groupCollapsed('Logger');
	console.log('%c Action:', 'color: blue', action);
	console.log('%c Previous State:', 'color: red', prevState);
	console.log('%c Current State:', 'color: green', currentState);
	console.groupEnd();
};
