import React, { useState } from 'react';
import { usePlayers } from 'hooks';
import classNames from 'classnames';

function GamePoints() {
	const [points, setPoints] = useState(-1);
	const { playersTurn, handleAddPoint } = usePlayers();

	const handlePointEvent = () => {
		handleAddPoint(playersTurn.name, points);
		setPoints(-1);
	};

	const numBtnClass = (i) => {
		const base =
			'h-11 flex items-center justify-center rounded-xl text-sm font-semibold transition-colors';
		const selected = 'bg-indigo-600 text-white shadow-sm';
		const unselected =
			'bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200';
		return `${base} ${points === i ? selected : unselected}`;
	};

	const confirmLabel = () => {
		if (points < 0) return 'Select a value';
		if (points === 0) return 'Confirm (Miss)';
		return `Confirm  +${points}`;
	};

	if (!playersTurn.name) return null;

	return (
		<div className="px-4 pt-6 pb-4 border-t border-slate-100">
			<p className="text-sm font-semibold text-slate-600 mb-4">
				<span className="text-slate-900">{playersTurn.name}</span>
				&apos;s turn
			</p>

			<div className="grid grid-cols-4 gap-2 mb-2">
				{[...Array(12)].map((_, i) => {
					const val = i + 1;
					return (
						<button
							key={val}
							type="button"
							className={numBtnClass(val)}
							onClick={() => setPoints(val)}
							data-testid={`btnPoint${val}`}
						>
							{val}
						</button>
					);
				})}
			</div>

			<button
				type="button"
				className={
					points === 0
						? 'w-full py-2 rounded-xl text-sm font-semibold mb-3 transition-colors border bg-slate-600 text-white border-slate-600'
						: 'w-full py-2 rounded-xl text-sm font-semibold mb-3 transition-colors border bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
				}
				onClick={() => setPoints(0)}
				data-testid="btnPoint0"
			>
				Miss
			</button>

			<button
				type="button"
				className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors text-sm"
				onClick={handlePointEvent}
				disabled={points < 0}
				data-testid="btnAdd"
			>
				{confirmLabel()}
			</button>
		</div>
	);
}

export default GamePoints;
