import React from 'react';
import { Link } from 'react-router-dom';
import { usePlayers } from 'hooks';

function Start() {
	const version = `v${process.env.REACT_APP_VERSION}`;
	const { handleNewGame } = usePlayers();

	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					CR Mölkky
					<div className="float-right">
						<Link
							to="players"
							onClick={() => handleNewGame()}
							className="btn btn-primary btn-sm mr-1"
						>
							Start game
						</Link>
					</div>
				</div>
				<div className="card-body">
					<p className="card-text">{version}</p>
				</div>
			</div>
		</div>
	);
}

export default Start;
