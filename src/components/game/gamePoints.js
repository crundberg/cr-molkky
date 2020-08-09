import React, { useState } from 'react';
import { usePlayers } from 'hooks';
import classNames from 'classnames';
import './game.css';

function GamePoints() {
	const [points, setPoints] = useState(-1);
	const { playersTurn, handleAddPoint } = usePlayers();

	const handlePointEvent = () => {
		handleAddPoint(playersTurn.name, points);
		setPoints(-1);
	};

	const pointButton = (_e, i) => {
		const className = classNames('btn btn-lg mr-1 mb-1', {
			'btn-primary': points === i,
			'btn-outline-primary': points !== i,
		});

		return (
			<button
				type="button"
				className={className}
				onClick={() => setPoints(i)}
				key={i}
				data-testid={'btnPoint' + i}
			>
				{i}
			</button>
		);
	};

	return playersTurn.name ? (
		<div className="card-body">
			<div className="points">
				<h5 className="card-title">{playersTurn.name}&apos;s turn</h5>

				<div className="mb-3">{[...Array(13)].map(pointButton)}</div>

				<p>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => handlePointEvent()}
						disabled={points < 0}
						data-testid="btnAdd"
					>
						{points > 0 ? `OK (+${points})` : 'Missed'}
					</button>
				</p>
			</div>
		</div>
	) : null;
}

export default GamePoints;
