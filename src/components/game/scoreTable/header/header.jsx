import React from 'react';
import { usePlayers } from 'hooks';
import '../../game.css';

function GameScoreTableHeader() {
	const { roundColumns } = usePlayers();
	const scoreColStyle = { width: `${12}%` };
	const scoreSumColStyle = { width: `${15}%` };

	return (
		<thead>
			<tr>
				<th scope="col">Name</th>
				{roundColumns().map((round) => {
					return (
						<th scope="col" style={scoreColStyle} key={round}>
							{round}
						</th>
					);
				})}
				<th scope="col" style={scoreSumColStyle}>
					Sum
				</th>
			</tr>
		</thead>
	);
}

export default GameScoreTableHeader;
