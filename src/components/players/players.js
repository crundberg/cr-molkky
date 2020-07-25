import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlayers } from 'hooks'

function Players() {
	const [ name, setName ] = useState('');
	const [ handicap, setHandicap ] = useState(false);
	const { players, handleAdd, handleDelete } = usePlayers();

	const onSubmit = (e) => {
		e.preventDefault();
		handleAdd(name, handicap);
	}

	return (
		<div className="container">
			<h1>Players</h1>

			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="player">Player name</label>
					<input type="text" className="form-control" id="player" value={name} onChange={e => setName(e.target.value)} />
				</div>
				<div className="form-group form-check">
					<input className="form-check-input" type="checkbox" value="" id="handicap" checked={handicap} onChange={e => setHandicap(e.target.checked)} />
					<label className="form-check-label" htmlFor="handicap">Handicap</label>
				</div>

				<button type="submit" className="btn btn-primary">Add player</button>
			</form>


			<ul className="list-group">
				{players.map(player => {
					return <li className="list-group-item d-flex justify-content-between align-items-center" key={player.name}>
						<span>{player.name} <button type="button" class="btn btn-link" onClick={e => handleDelete(player.name)}>Delete</button></span>
						{player.handicap ? <span className="badge badge-primary badge-pill">Handicap</span> : ''}
					</li>
				})}
			</ul>

			<p><Link to="game" className="btn btn-primary">Start game</Link></p>
		</div>
	);
}

export default Players;