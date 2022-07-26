import React from 'react';
import PropTypes from 'prop-types';
import { usePlayers } from 'hooks';
import classNames from 'classnames';

function GameScoreTableRow({ player }) {
	const { playersTurn, roundColumns } = usePlayers();
	const { name, currentPoints, disqualified, handicap, points } = player;

	const finished = currentPoints === 50 || disqualified;

	const rowClass = classNames({
		'table-primary': name === playersTurn.name,
		'table-disqualified': disqualified,
		'table-warning': currentPoints === 50,
	});

	return (
		<tr key={name} className={rowClass}>
			<th scope="row">
				{name}
				{handicap && <span className="badge badge-warning">HCP</span>}
			</th>
			{roundColumns.map((round) => {
				const roundPoints = points[round - 1];

				return (
					<td key={round}>
						{roundPoints > 0 && roundPoints}
						{roundPoints === 0 && handicap && '0'}
						{roundPoints === 0 && !handicap && (
							<span className="badge badge-danger">X</span>
						)}
						{roundPoints === undefined && finished && '-'}
					</td>
				);
			})}
			<td>{currentPoints}</td>
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
