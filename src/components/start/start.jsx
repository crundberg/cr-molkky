import React from 'react';
import { Link } from 'react-router-dom';
import { usePlayers } from 'hooks';

const rules = [
	{
		heading: 'Objective',
		text: 'Be the first player to reach exactly 50 points.',
	},
	{
		heading: 'Scoring',
		text: 'Knock down 1 skittle → score its number (1–12). Knock down multiple skittles → score the count (e.g. knocking over 4 skittles = 4 points).',
	},
	{
		heading: 'Over 50',
		text: 'Exceeding 50 resets your score to 25.',
	},
	{
		heading: 'Disqualification',
		text: 'Three consecutive misses (0 points) knocks a player out of the game. Players with handicap (HCP) are exempt.',
	},
];

// Skittle rows from furthest to closest (throwing line at bottom)
const skittleRows = [[7, 9, 8], [5, 11, 12, 6], [3, 10, 4], [1, 2]];

function Start() {
	const version = `v${import.meta.env.VITE_APP_VERSION}`;
	const { handleNewGame } = usePlayers();

	return (
		<div className="sm:min-h-screen sm:bg-slate-50 sm:flex sm:items-start sm:justify-center sm:pt-12 sm:px-4">
			<div className="w-full sm:max-w-md bg-white sm:rounded-2xl sm:shadow-sm sm:border sm:border-slate-200">
				<div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
					<h1 className="text-lg font-bold text-slate-800">CR Mölkky</h1>
					<Link
						to="/players"
						onClick={() => handleNewGame()}
						className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
					>
						New game
					</Link>
				</div>

				<div className="px-4 pt-5 pb-4 space-y-4">
					<p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
						How to play
					</p>
					<ul className="space-y-3">
						{rules.map((rule) => (
							<li key={rule.heading} className="flex gap-3">
								<span className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5" />
								<p className="text-sm text-slate-600 leading-snug">
									<span className="font-semibold text-slate-800">
										{rule.heading}:{' '}
									</span>
									{rule.text}
								</p>
							</li>
						))}
					</ul>

					<div className="pt-1">
						<p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
							Initial setup
						</p>
						<div className="flex flex-col items-center gap-1.5">
							{skittleRows.map((row) => (
								<div key={row[0]} className="flex gap-1.5">
									{row.map((n) => (
										<span
											key={n}
											className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 text-xs font-bold"
										>
											{n}
										</span>
									))}
								</div>
							))}
							<div className="my-1 flex flex-col items-center gap-0.5 w-full">
								<div className="w-px h-6 border-l border-dashed border-slate-300" />
								<p className="text-xs text-slate-400">3.5 m</p>
								<div className="w-px h-6 border-l border-dashed border-slate-300" />
							</div>
							<div className="w-full flex items-center gap-2">
								<div className="flex-1 border-t border-dashed border-slate-300" />
								<p className="text-xs text-slate-400 shrink-0">Throwing line</p>
								<div className="flex-1 border-t border-dashed border-slate-300" />
							</div>
						</div>
					</div>

					<p className="text-xs text-slate-300 pt-1">{version}</p>
				</div>
			</div>
		</div>
	);
}

export default Start;
