import React from 'react';
import { usePlayers } from 'hooks';
import { GameScoreTableHeader, GameScoreTableRow } from '.';

function GameScoreTable() {
	const { players, sortScore } = usePlayers();

	return (
		<table className="table">
			<GameScoreTableHeader />
			<tbody>
				{players.sort(sortScore).map((player) => (
					<GameScoreTableRow player={player} key={player.name} />
				))}
			</tbody>
		</table>
	);
}

export default GameScoreTable;
