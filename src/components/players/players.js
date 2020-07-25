import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames'
import { usePlayers } from 'hooks'

function Players() {
	const [ name, setName ] = useState('');
	const [ handicap, setHandicap ] = useState(false);
	const { players, handleAdd, handleDelete } = usePlayers();

	const onSubmit = (e) => {
		e.preventDefault();
		handleAdd(name, handicap);

		setName('');
		setHandicap(false);
	}

	const handicapClass = classNames('btn', {
		'btn-outline-secondary': !handicap,
		'btn-secondary': handicap,
	})

	return (
		<div className="container">
			<h1>Players</h1>

			<form onSubmit={onSubmit}>
				<div className="input-group mb-3">
					<input type="text" className="form-control" id="player" value={name} onChange={e => setName(e.target.value)} />
					<div className="input-group-append" id="button-addon3">
						<button className={handicapClass} type="button" onClick={e => setHandicap(!handicap)}>Handicap</button>
						<button className="btn btn-outline-secondary" type="submit" >+</button>
					</div>
				</div>
			</form>

			<ul className="list-group mb-3">
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