import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { usePlayers } from 'hooks';
import classNames from 'classnames';

function Game() {
	const [points, setPoints] = useState(-1);
	const { players, handleAddPoint, handleNewGame } = usePlayers();

	if (players.length === 0) {
		return <Redirect to="/" />;
	}

	const playersTurn = players.reduce((turn, player) => {
		const turnLength = turn.points.length;
		const playerLength = player.points.length;

		if (player.disqualified) return turn;
		else if (turnLength > playerLength) return player;
		else if (turnLength < playerLength) return turn;
		else if (player.points[turnLength - 1] < turn.points[playerLength - 1])
			return player;

		return turn;
	}, players[0]);

	const handlePointEvent = () => {
		handleAddPoint(playersTurn.name, points);
		setPoints(-1);
	};

	const sort = (a, b) => {
		var comparison = 0;

		if (!a.disqualified && b.disqualified) {
			comparison = -1;
		} else if (a.disqualified && !b.disqualified) {
			comparison = 1;
		} else if (a.currentPoints > b.currentPoints) {
			comparison = -1;
		} else if (a.currentPoints < b.currentPoints) {
			comparison = 1;
		}

		return comparison;
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
			>
				{i}
			</button>
		);
	};

	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					CR Mölkky
					<div className="float-right">
						<button
							type="button"
							className="btn btn-primary btn-sm mr-1"
							onClick={() => handleNewGame()}
						>
							New game
						</button>
						<button
							type="button"
							className="btn btn-primary btn-sm"
							onClick={() => handleNewGame()}
						>
							Settings
						</button>
					</div>
				</div>
				<div className="card-body">
					<ul className="list-group mb-3">
						{players.sort(sort).map((player) => {
							const className = classNames(
								'list-group-item d-flex justify-content-between align-items-center',
								{
									active: player.name === playersTurn.name && !player.winner,
									disabled: player.disqualified,
									'list-group-item-warning': player.winner,
								}
							);

							return (
								<li className={className} key={player.name}>
									{player.name}
									<span className="badge badge-danger badge-pill">
										{player.handicap ? 'HCP' : player.misses}
									</span>
									<span className="badge badge-primary badge-pill">
										{player.currentPoints}
									</span>
								</li>
							);
						})}
					</ul>

					<h5 className="card-title">{playersTurn.name}&apos;s turn</h5>

					<div className="mb-3">{[...Array(13)].map(pointButton)}</div>

					<p>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => handlePointEvent()}
							disabled={points < 0}
						>
							{points > 0 ? `OK (+${points})` : 'Missed'}
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Game;
