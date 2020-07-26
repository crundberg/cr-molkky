import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from 'store';
import Players from '../players';

const setup = () => {
	const history = createMemoryHistory();
	const utils = render(
		<Provider>
			<Router history={history}>
				<Players />
			</Router>
		</Provider>
	);

	const btnAdd = utils.getByText('+');
	const btnHcp = utils.getByText('Handicap');
	const inputName = utils.getByLabelText('player');

	return {
		btnAdd,
		btnHcp,
		inputName,
		...utils,
	}
  }

it('renders without crashing', () => {
	setup();
});

it('is not possible to add player without name', () => {
	const { btnAdd, inputName } = setup();

	expect(btnAdd).toBeDisabled();
	fireEvent.change(inputName, { target: { value: 'CR' } });
	expect(btnAdd).toBeEnabled();
});

it('is not possible to add player is name alredy exists', () => {
	const { btnAdd, inputName } = setup();

	expect(btnAdd).toBeDisabled();
	fireEvent.change(inputName, { target: { value: 'CR' } });
	expect(btnAdd).toBeEnabled();
	fireEvent.click(btnAdd);
	expect(btnAdd).toBeDisabled();
	fireEvent.change(inputName, { target: { value: 'C' } });
	expect(btnAdd).toBeEnabled();
	fireEvent.change(inputName, { target: { value: 'CR' } });
	expect(btnAdd).toBeDisabled();
});

it('is possible to toggle handicap', () => {
	const { btnHcp } = setup();

	expect(btnHcp).toHaveClass('btn-outline-secondary');
	fireEvent.click(btnHcp);
	expect(btnHcp).toHaveClass('btn-secondary');
	fireEvent.click(btnHcp);
	expect(btnHcp).toHaveClass('btn-outline-secondary');
});

it.skip('is possible to add player', () => {
	const { btnAdd, inputName } = setup();

	fireEvent.change(inputName, { target: { value: 'CR' } });
	fireEvent.click(btnAdd);
	expect(inputName.value).toBe('');
});

it('is possible to add player with handicap', () => {});