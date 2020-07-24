import React, { useState } from 'react';
import { usePlayers } from 'hooks'

function Game() {
	const [ points, setPoints ] = useState(0);
	const { players } = usePlayers();

	console.log(players);

	var playersTurn = players.reduce(function (turn, player) {
		if (!turn.points) return player;

		const length = turn.points.lenght || 0;
		
		if (length > player.points.lenght) return player;
		if (player.points[length - 1] < turn.points[length - 1]) return player;

		return turn;
	}, {});

	return (
		<div className="container">
			<p>{playersTurn.name}'s turn</p>

			<p>{points} points</p>

			<p>
				{[...Array(13)].map((e, i) => {
					return <button type="button" className={points === i ? 'btn btn-primary' : 'btn btn-outline-primary'} onClick={e => setPoints(i)} key={i}>{i}</button>
				})}
			</p>
		</div>
	);
}

export default Game;