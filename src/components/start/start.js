import React from 'react';
import { Link } from 'react-router-dom';

function Start() {
	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					CR Mölkky

					<div className="float-right">
						<Link to="players" className="btn btn-primary btn-sm mr-1">Start game</Link>
					</div>
				</div>
				<div class="card-body">
					<p class="card-text">Lorem impsum...</p>
				</div>
			</div>
		</div>
	);
}

export default Start;