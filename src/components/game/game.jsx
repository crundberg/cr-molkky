import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePlayers } from 'hooks';
import { Dropdown } from 'components/bootstrap';
import { GameScoreTable } from './scoreTable';
import { GamePoints } from './points';

function Game() {
	const { players, handleNewGame, handleRematch, handleUndoPoint, canUndo } =
		usePlayers();

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
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={handleUndoPoint}
								disabled={!canUndo}
								className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
								aria-label="Undo last throw"
								title="Undo last throw"
							>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
									/>
								</svg>
							</button>
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
					</div>

					<GameScoreTable />
					<GamePoints />
				</div>
			</div>
		</div>
	);
}

export default Game;
