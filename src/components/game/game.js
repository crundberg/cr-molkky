import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { usePlayers } from 'hooks'
import classNames from 'classnames'

function Game() {
	const [ points, setPoints ] = useState(-1);
	const { players, handleAddPoint, handleNewGame } = usePlayers();

	if (players.length === 0) {
		return <Redirect to="/" />
	}

	const playersTurn = players.reduce((turn, player) => {
		const turnLength = turn.points.length;
		const playerLength = player.points.length;

		if (player.disqualified) return turn;
		else if (turnLength > playerLength) return player;
		else if (turnLength < playerLength) return turn;
		else if (player.points[turnLength - 1] < turn.points[playerLength - 1]) return player;

		return turn;
	}, players[0]);

	const handlePointEvent = () => {
		handleAddPoint(playersTurn.name, points);
		setPoints(-1);
	}

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
	}

	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					CR Mölkky

					<div className="float-right">
						<button type="button" className="btn btn-primary btn-sm mr-1" onClick={e => handleNewGame()}>New game</button>
						<button type="button" className="btn btn-primary btn-sm" onClick={e => handleNewGame()}>Settings</button>
					</div>
				</div>
				<div className="card-body">
					<ul className="list-group mr-3">
						{players.sort(sort).map(player => {
							const className = classNames(
								'list-group-item d-flex justify-content-between align-items-center',
								{
									'active': player.name === playersTurn.name && !player.winner,
									'disabled': player.disqualified,
									'list-group-item-warning': player.winner
								}
							);

							return <li className={className} key={player.name}>
								{player.name}
								<span className="badge badge-danger badge-pill">{player.misses}</span>
								<span className="badge badge-primary badge-pill">{player.currentPoints}</span>
							</li>
						})}
					</ul>

					<p>{playersTurn.name}'s turn</p>

					<div class="btn-group mb-3" role="group">
						{[...Array(13)].map((_e, i) => {
							const className = classNames('btn', {
								'btn-primary': points === i,
								'btn-outline-primary': points !== i,
							})

							return <button type="button" className={className} onClick={e => setPoints(i)} key={i}>{i}</button>
						})}
					</div>

					<p>
						<button type="button" className="btn btn-primary" onClick={e => handlePointEvent()} disabled={points < 0}>
							{ (points > 0) ? `OK (+${points})` : 'Missed' }
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Game;