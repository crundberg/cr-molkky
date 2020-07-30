import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { usePlayers } from 'hooks';

function Players() {
	const [name, setName] = useState('');
	const [handicap, setHandicap] = useState(false);
	const { players, handleAdd, handleDelete, shuffle } = usePlayers();

	const onSubmit = (e) => {
		e.preventDefault();
		handleAdd(name, handicap);

		setName('');
		setHandicap(false);
	};

	const handicapClass = classNames('btn', {
		'btn-outline-secondary': !handicap,
		'btn-secondary': handicap,
	});

	const disableAdd =
		name.length === 0 ||
		players.filter((player) => player.name === name).length !== 0;

	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					Add players
					<div className="float-right">
						<Link to="game" className="btn btn-primary btn-sm">
							Start game
						</Link>
					</div>
				</div>
				<div className="card-body">
					<form onSubmit={onSubmit}>
						<div className="input-group mb-3">
							<input
								type="text"
								className="form-control"
								id="player"
								aria-label="player"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>

							<div className="input-group-append" id="button-addon3">
								<button
									className={handicapClass}
									type="button"
									onClick={() => setHandicap(!handicap)}
								>
									Handicap
								</button>
								<button
									className="btn btn-outline-secondary"
									type="submit"
									disabled={disableAdd}
								>
									+
								</button>
							</div>
						</div>
					</form>

					<ul className="list-group mb-3">
						{players.map((player) => {
							return (
								<li
									className="list-group-item d-flex justify-content-between align-items-center"
									key={player.name}
								>
									<span>
										{player.name}{' '}
										<button
											type="button"
											className="btn btn-link"
											onClick={() => handleDelete(player.name)}
										>
											Delete
										</button>
									</span>
									{player.handicap ? (
										<span className="badge badge-primary badge-pill">
											Handicap
										</span>
									) : (
										''
									)}
								</li>
							);
						})}
					</ul>

					<button
						type="button"
						className="btn btn-primary"
						onClick={() => shuffle()}
					>
						Shuffle
					</button>
				</div>
			</div>
		</div>
	);
}

export default Players;
