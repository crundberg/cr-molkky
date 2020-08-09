import bindActions from '../bindActions';

it('should bind one function', () => {
	const dispatch = () => {};
	const handleAdd = () => {};

	const playerActions = bindActions(handleAdd, dispatch);
});

it('should bind multiple functions', () => {
	const dispatch = () => {};
	const handleAdd = () => {};
	const handleDelete = () => {};
	const myString = '';

	const playerActions = bindActions(
		{
			handleAdd,
			handleDelete,
			myString,
		},
		dispatch
	);
});

it('should throw a error if action is a string instead of a function or object', () => {
	const dispatch = () => {};

	const playerActions = () => bindActions('String', dispatch);

	expect(playerActions).toThrow(
		'bindActions expected an object or a function, instead received string.'
	);
});

it('should throw a error if action is null instead of a function or object', () => {
	const dispatch = () => {};

	const playerActions = () => bindActions(null, dispatch);

	expect(playerActions).toThrow(
		'bindActions expected an object or a function, instead received null.'
	);
});
