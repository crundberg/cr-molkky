import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayers } from 'hooks';

function Players() {
	const [name, setName] = useState('');
	const [handicap, setHandicap] = useState(false);
	const [startOrder, setStartOrder] = useState('shuffle');
	const navigate = useNavigate();
	const { players, handleAdd, handleDelete, handleShuffle } = usePlayers();

	const onSubmit = (e) => {
		e.preventDefault();
		handleAdd(name, handicap);
		setName('');
		setHandicap(false);
	};

	const onStartGame = (e) => {
		e.preventDefault();
		if (startOrder === 'shuffle') handleShuffle();
		navigate('/game');
	};

	const disableAdd =
		name.length === 0 ||
		players.some((player) => player.name === name);

	return (
		<div className="min-h-screen flex flex-col items-center pt-12 px-4">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
					<div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
						<h1 className="text-lg font-bold text-slate-800">Add players</h1>
						<button
							type="button"
							className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
							onClick={onStartGame}
							disabled={players.length === 0}
						>
							Start game
						</button>
					</div>

					<div className="p-5 space-y-5">
						<form onSubmit={onSubmit}>
							<div className="flex gap-2">
								<input
									type="text"
									className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
									id="player"
									aria-label="player"
									placeholder="Player name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<button
									type="button"
									className={`px-3 py-2 text-sm rounded-lg border transition-colors font-medium ${
										handicap
											? 'bg-amber-100 border-amber-300 text-amber-700'
											: 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
									}`}
									onClick={() => setHandicap(!handicap)}
								>
									HCP
								</button>
								<button
									type="submit"
									disabled={disableAdd}
									className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
								>
									Add
								</button>
							</div>
						</form>

						{players.length > 0 && (
							<ul className="space-y-2">
								{players.map((player) => (
									<li
										key={player.name}
										className="flex items-center justify-between px-3 py-2.5 bg-slate-50 rounded-xl"
									>
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium text-slate-800">
												{player.name}
											</span>
											{player.handicap && (
												<span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-md font-medium">
													HCP
												</span>
											)}
										</div>
										<button
											type="button"
											className="text-slate-300 hover:text-red-400 transition-colors p-1"
											onClick={() => handleDelete(player.name)}
											aria-label={`Remove ${player.name}`}
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
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</li>
								))}
							</ul>
						)}

						<div>
							<p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
								Start order
							</p>
							<div className="flex gap-2">
								<button
									type="button"
									className={`flex-1 py-2 text-sm rounded-lg border transition-colors font-medium ${
										startOrder === 'shuffle'
											? 'bg-indigo-600 text-white border-indigo-600'
											: 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
									}`}
									onClick={() => setStartOrder('shuffle')}
								>
									Shuffle
								</button>
								<button
									type="button"
									className={`flex-1 py-2 text-sm rounded-lg border transition-colors font-medium ${
										startOrder === 'list'
											? 'bg-indigo-600 text-white border-indigo-600'
											: 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
									}`}
									onClick={() => setStartOrder('list')}
								>
									In order
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Players;
