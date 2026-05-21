import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
				<Routes>
					<Route path="/" element={<Start />} />
					<Route path="/players" element={<Players />} />
					<Route path="/game" element={<Game />} />
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</Provider>
		</Router>
	);
}

export default App;
