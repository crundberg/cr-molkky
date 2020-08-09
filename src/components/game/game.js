import React from 'react';
import { Redirect } from 'react-router-dom';
import { usePlayers } from 'hooks';
import { Dropdown } from 'components/bootstrap';
import { GameScoreTable, GamePoints } from '.';
import './game.css';

function Game() {
	const { players, handleNewGame, handleRematch } = usePlayers();

	if (players.length === 0) {
		return <Redirect to="/" />;
	}

	const handleNewGameClick = (e) => {
		window.confirm('Are you sure you want to start a new game?') &&
			handleNewGame();
	};

	const handleRematchClick = (e) => {
		window.confirm('Are you sure you want to restart the game?') &&
			handleRematch();
	};

	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					CR Mölkky
					<div className="float-right">
						<Dropdown text="Menu" buttonStyle="btn-sm">
							<Dropdown.Item onClick={handleNewGameClick}>
								New game
							</Dropdown.Item>
							<Dropdown.Item onClick={handleRematchClick}>
								Restart game
							</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item href="/settings">Settings</Dropdown.Item>
						</Dropdown>
					</div>
				</div>

				<GameScoreTable />
				<GamePoints />
			</div>
		</div>
	);
}

export default Game;
