import React from 'react';
import { usePlayers } from 'hooks';

function GameScoreTableHeader() {
	const { roundColumns } = usePlayers();

	return (
		<thead>
			<tr className="border-b border-slate-200">
				<th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
					Player
				</th>
				{roundColumns.map((round) => (
					<th
						key={round}
						className="px-2 py-2.5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider w-10"
					>
						{round}
					</th>
				))}
				<th className="px-3 py-2.5 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
					∑
				</th>
			</tr>
		</thead>
	);
}

export default GameScoreTableHeader;
