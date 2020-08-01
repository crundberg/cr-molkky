import React from 'react';
import { Link } from 'react-router-dom';

function Start() {
	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					CR Mölkky
					<div className="float-right">
						<Link to="players" className="btn btn-primary btn-sm mr-1">
							Start game
						</Link>
					</div>
				</div>
				<div className="card-body">
					<p className="card-text">Lorem impsum...</p>
					<p className="card-text">v{process.env.REACT_APP_VERSION}</p>
				</div>
			</div>
		</div>
	);
}

export default Start;
