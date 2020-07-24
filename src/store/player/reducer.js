import * as PLAYER from './types';

export const initialState = [];

export default function players(state = initialState, action) {
	switch (action.type) {
		case PLAYER.ADD:
			console.log('Action', action);
			return [
				...state,
				{
					name: action.payload.name,
					handicap: action.payload.handicap,
					points: []
				}
			]
		case PLAYER.DELETE:
			return state.filter(player => player.name !== action.payload.name)
		default: {
			return state;
		}
	}
}



/*
export const loading = (state, _payload) => ({
	...state,
	status: 'LOADING',
	error: null
});

export const error = (state, { payload }) => ({
	...state,
	status: 'ERROR',
	error: payload,
});

export const add = (state, { payload }) => ({
	...state,
	status: 'SUCCESS',
	items: [...state.items, payload]
});

export const update = (state, { payload }) => {
	const updatedItem = payload;

	const updateditems = state.items.map(item => {
		if (item.id === updatedItem.id) {
			return updatedItem;
		}
		return item;
	});

	return {
		...state,
		status: 'SUCCESS',
		items: updateditems
	};
};

export const remove = (state, { payload }) => ({
	...state,
	status: 'SUCCESS',
	items: state.items.filter(item => item.id !== payload)
});

export const filter = (state, { payload }) => ({
	...state,
	status: 'SUCCESS',
	items: payload
});

export const addComment = (state, { payload }) => {
	console.error(new Error('Test'));
	const items = state.items;
	const comment = payload;

	const index = items.findIndex(x => x.id === comment.feedId);
	items[index].comments = items[index].comments.concat(comment);

	return {
		...state,
		status: 'SUCCESS',
		items: items
	};
		
		//const data = items.slice();
		//const index = data.findIndex(x => x.id === item.feedId);

		//item.timestamp = new Date().toLocaleString();
		//item.username = user;

		//data[index].comments = data[index].comments.concat(item);
		//setData(data);
};

export const setIsLiked = (state, { payload }) => {
	console.error(new Error('Test'));
	const items = state.items;
	//const like = payload;

	//const index = items.findIndex(x => x.id === like.feedId);
	//items[index].likes = items[index].likes.concat(like);

	return {
		...state,
		status: 'SUCCESS',
		items: items
	};
};

export const showState = (state, { payload }) => ({
	...state,
	status: 'SUCCESS'
});*/