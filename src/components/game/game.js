import React, { useState } from 'react';
import { usePlayers } from 'hooks'
import classNames from 'classnames'

function Game() {
	const [ points, setPoints ] = useState(-1);
	const { players, handleAddPoint, handleNewGame } = usePlayers();

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

	return (
		<div className="container">
			<p>{playersTurn.name}'s turn</p>

			<ul class="list-group">
			{players.map(player => {
					const className = classNames(
						'list-group-item d-flex justify-content-between align-items-center',
						{
							active: player.name === playersTurn.name,
							disabled: player.disqualified
						}
					);
					return <li className={className} key={player.name}>
						{player.name}
						<span className="badge badge-danger badge-pill">{player.misses}</span>
						<span className="badge badge-primary badge-pill">{player.currentPoints}</span>
					</li>
				})}
			</ul>

			<p>
				{[...Array(13)].map((e, i) => {
					return <button type="button" className={points === i ? 'btn btn-primary' : 'btn btn-outline-primary'} onClick={e => setPoints(i)} key={i}>{i}</button>
				})}
			</p>

			<p>
				<button type="button" className="btn btn-primary" onClick={e => handlePointEvent()} disabled={points < 0}>
					{ (points > 0) ? `OK (+${points})` : 'Missed' }
				</button>
			</p>

			<p><button type="button" className="btn btn-primary" onClick={e => handleNewGame()}>New game</button></p>
		</div>
	);
}

export default Game;