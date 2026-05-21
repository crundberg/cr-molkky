import React from 'react';
import PropTypes from 'prop-types';
import { usePlayers } from 'hooks';
import classNames from 'classnames';

function GameScoreTableRow({ player }) {
	const { playersTurn, roundColumns } = usePlayers();
	const { name, currentPoints, disqualified, handicap, points } = player;

	const isCurrentTurn = name === playersTurn.name;
	const isWinner = currentPoints === 50 && !disqualified;
	const finished = isWinner || disqualified;

	const rowClass = classNames('border-b border-slate-100 last:border-0', {
		'bg-indigo-50': isCurrentTurn && !isWinner,
		'bg-amber-50': isWinner,
	});

	const nameClass = classNames('text-sm font-semibold', {
		'text-slate-800': !disqualified,
		'text-slate-400 line-through': disqualified,
	});

	return (
		<tr className={rowClass}>
			<td className="px-4 py-3">
				<div className="flex items-center gap-2">
					{isCurrentTurn && !isWinner && (
						<span className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500" />
					)}
					{isWinner && <span className="shrink-0 text-base">🏆</span>}
					<span className={nameClass}>{name}</span>
					{handicap && (
						<span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-md font-medium">
							HCP
						</span>
					)}
				</div>
			</td>
			{roundColumns.map((round) => {
				const roundPoints = points[round - 1];
				return (
					<td key={round} className="px-2 py-3 text-center text-sm">
						{roundPoints > 0 && (
							<span className="text-slate-700">{roundPoints}</span>
						)}
						{roundPoints === 0 && handicap && (
							<span className="text-slate-500">0</span>
						)}
						{roundPoints === 0 && !handicap && (
							<span className="text-red-400 font-bold">×</span>
						)}
						{roundPoints === undefined && finished && (
							<span className="text-slate-300">—</span>
						)}
					</td>
				);
			})}
			<td className="px-3 py-3 text-center">
				<span
					className={classNames('text-sm font-bold tabular-nums', {
						'text-indigo-600': isCurrentTurn && !isWinner,
						'text-amber-600': isWinner,
						'text-slate-400': disqualified,
						'text-slate-800': !isCurrentTurn && !isWinner && !disqualified,
					})}
				>
					{currentPoints}
				</span>
			</td>
		</tr>
	);
}

GameScoreTableRow.propTypes = {
	player: PropTypes.shape({
		name: PropTypes.string,
		currentPoints: PropTypes.number,
		disqualified: PropTypes.bool,
		handicap: PropTypes.bool,
		points: PropTypes.arrayOf(PropTypes.number),
	}).isRequired,
};

export default GameScoreTableRow;
