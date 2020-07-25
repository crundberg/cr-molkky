import React, { useState } from 'react';
import { usePlayers } from 'hooks'

function Game() {
	const [ points, setPoints ] = useState(0);
	const { players, handleAddPoint, handleNewGame } = usePlayers();

	const playersTurn = players.reduce((turn, player) => {
		const turnLength = turn.points.length;
		const playerLength = player.points.length;

		if (turnLength > playerLength) return player;
		else if (turnLength < playerLength) return turn;
		else if (player.points[turnLength - 1] < turn.points[playerLength - 1]) return player;

		return turn;
	}, players[0]);

	const handlePointEvent = () => {
		handleAddPoint(playersTurn.name, points);
		setPoints(0);
	}

	return (
		<div className="container">
			<p>{playersTurn.name}'s turn</p>

			<p>{points} points</p>

			<p>
				{[...Array(13)].map((e, i) => {
					return <button type="button" className={points === i ? 'btn btn-primary' : 'btn btn-outline-primary'} onClick={e => setPoints(i)} key={i}>{i}</button>
				})}
			</p>

			<p>
				<button type="button" className="btn btn-primary" onClick={e => handlePointEvent()}>
					{ (points > 0) ? `OK (+${points})` : 'Missed' }
				</button>
			</p>

			<p><button type="button" className="btn btn-primary" onClick={e => handleNewGame()}>New game</button></p>
		</div>
	);
}

export default Game;