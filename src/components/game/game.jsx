import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePlayers } from 'hooks';
import { Dropdown } from 'components/bootstrap';
import { GameScoreTable } from './scoreTable';
import { GamePoints } from './points';

function Game() {
	const { players, handleNewGame, handleRematch } = usePlayers();

	if (players.length === 0) {
		return <Navigate to="/" />;
	}

	const handleNewGameClick = () => {
		if (window.confirm('Start a new game?')) handleNewGame();
	};

	const handleRematchClick = () => {
		if (window.confirm('Restart with the same players?')) handleRematch();
	};

	return (
		<div className="min-h-screen flex flex-col items-center pt-6 px-4 pb-8">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
					<div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
						<h1 className="text-lg font-bold text-slate-800">CR Mölkky</h1>
						<Dropdown text="Menu">
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

					<GameScoreTable />
					<GamePoints />
				</div>
			</div>
		</div>
	);
}

export default Game;
