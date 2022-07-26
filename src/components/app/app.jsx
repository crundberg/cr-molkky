import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Start } from 'components/start';
import { Players } from 'components/players';
import { Game } from 'components/game';
import { Settings } from 'components/settings';
import Provider from 'store';
import './app.css';

function App() {
	return (
		<Router>
			<Provider>
				<Switch>
					<Route exact path="/" component={Start} />
					<Route exact path="/players" component={Players} />
					<Route exact path="/game" component={Game} />
					<Route exact path="/settings" component={Settings} />
				</Switch>
			</Provider>
		</Router>
	);
}

export default App;
