import React from 'react';
import { Link } from 'react-router-dom';

function Start() {
	return (
		<div className="container">
			<h1>CR Mölkky</h1>

			<p>Lorem impsum...</p>

			<Link to="players" className="btn btn-primary">Start game</Link>
		</div>
	);
}

export default Start;