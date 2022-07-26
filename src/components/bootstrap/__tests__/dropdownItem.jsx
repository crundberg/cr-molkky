import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import DropdownItem from '../dropdownItem';

it('renders with text props', () => {
	const history = createMemoryHistory();
	const screen = render(
		<Router history={history}>
			<DropdownItem href="/page">Item</DropdownItem>
		</Router>
	);

	const item = screen.getByText('Item');
	expect(item).toHaveTextContent('Item');
});

it('renders with link props', () => {
	const history = createMemoryHistory();
	const screen = render(
		<Router history={history}>
			<DropdownItem href="/page">Item</DropdownItem>
		</Router>
	);

	const item = screen.getByText('Item');
	expect(item).toHaveAttribute('href', '/page');
});

it('renders with onClick props', () => {
	const history = createMemoryHistory();
	const onClick = jest.fn();
	const screen = render(
		<Router history={history}>
			<DropdownItem onClick={onClick}>Item</DropdownItem>
		</Router>
	);
	const item = screen.getByText('Item');

	expect(onClick).not.toHaveBeenCalled();
	fireEvent.click(item);
	expect(onClick).toHaveBeenCalled();
});

it('can handle default props for onClick', () => {
	const history = createMemoryHistory();
	const screen = render(
		<Router history={history}>
			<DropdownItem>Item</DropdownItem>
		</Router>
	);

	const item = screen.getByText('Item');
	fireEvent.click(item);
});
