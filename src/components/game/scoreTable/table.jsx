import React from 'react';
import { usePlayers } from 'hooks';
import { GameScoreTableHeader } from './header';
import { GameScoreTableRow } from './row';

function GameScoreTable() {
	const { playersByScore } = usePlayers();

	return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<GameScoreTableHeader />
				<tbody>
					{playersByScore.map((player) => (
						<GameScoreTableRow player={player} key={player.name} />
					))}
				</tbody>
			</table>
		</div>
	);
}

export default GameScoreTable;
