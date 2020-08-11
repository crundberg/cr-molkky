import React from 'react';
import { Link } from 'react-router-dom';

function Settings() {
	return (
		<div className="container">
			<div className="card">
				<div className="card-header">
					CR Mölkky
					<div className="float-right">
						<Link to="/game" className="btn btn-primary btn-sm">
							Game
						</Link>
					</div>
				</div>
				<div className="card-body">
					<p className="card-text">Settings...</p>
				</div>
			</div>
		</div>
	);
}

export default Settings;
