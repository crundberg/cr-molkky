import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dropdown from '../dropdown';

it('renders with text props', () => {
	const screen = render(
		<Dropdown text="Button text" buttonStyle="extra-class" />
	);

	const button = screen.getByText('Button text');
	expect(button).toHaveTextContent('Button text');
	expect(button).toHaveClass('extra-class');
});

it('renders with style props', () => {
	const screen = render(
		<Dropdown
			text="Dropdown button"
			buttonStyle="extra-style"
			menuStyle="menu-extra-style"
		/>
	);

	const button = screen.getByText('Dropdown button');
	expect(button).toHaveTextContent('Dropdown button');
	expect(button).toHaveClass('extra-style');

	const menu = screen.getByTestId('dropdown-menu');
	expect(menu).toHaveClass('menu-extra-style');
});

it('should toggle dropdown menu on button click', () => {
	const screen = render(
		<Dropdown text="Button">
			<Dropdown.Item>Text</Dropdown.Item>
		</Dropdown>
	);

	const button = screen.getByText('Button');
	const menu = screen.getByTestId('dropdown-menu');

	expect(menu).not.toHaveClass('show');

	fireEvent.click(button);
	expect(menu).toHaveClass('show');

	fireEvent.click(button);
	expect(menu).not.toHaveClass('show');
});

it('should close dropdown menu on click outside the dropdown', () => {
	const screen = render(
		<div>
			<h1>Dropdown test</h1>
			<Dropdown text="Button">
				<Dropdown.Item>Item</Dropdown.Item>
			</Dropdown>
		</div>
	);

	const header = screen.getByText('Dropdown test');
	const button = screen.getByText('Button');
	const menu = screen.getByTestId('dropdown-menu');
	const item = screen.getByText('Item');

	expect(menu).not.toHaveClass('show');

	fireEvent.click(button);
	expect(menu).toHaveClass('show');

	fireEvent.mouseDown(header);
	expect(menu).not.toHaveClass('show');

	fireEvent.click(button);
	expect(menu).toHaveClass('show');

	fireEvent.mouseDown(item);
	expect(menu).toHaveClass('show');
});
