import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { usePlayers } from 'hooks';
import { GameScoreTable, GamePoints } from './';
import './game.css';

function Game() {
	const { players, handleNewGame } = usePlayers();

	if (players.length === 0) {
		return <Redirect to="/" />;
	}

	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					CR Mölkky
					<div className="float-right">
						<button
							type="button"
							className="btn btn-primary btn-sm mr-1"
							onClick={() => handleNewGame()}
						>
							New game
						</button>
						<Link to="/settings" className="btn btn-primary btn-sm">
							Settings
						</Link>
					</div>
				</div>

				<GameScoreTable />
				<GamePoints />
			</div>
		</div>
	);
}

export default Game;
