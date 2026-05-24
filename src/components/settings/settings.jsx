import React from 'react';
import { Link } from 'react-router-dom';

function Settings() {
	return (
		<div className="sm:min-h-screen sm:bg-slate-50 sm:flex sm:items-start sm:justify-center sm:pt-12 sm:px-4">
			<div className="w-full sm:max-w-md bg-white sm:rounded-2xl sm:shadow-sm sm:border sm:border-slate-200">
				<div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
					<h1 className="text-lg font-bold text-slate-800">Settings</h1>
					<Link
						to="/game"
						className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
					>
						Back to game
					</Link>
				</div>
				<div className="px-4 py-4">
					<p className="text-sm text-slate-400">Settings coming soon...</p>
				</div>
			</div>
		</div>
	);
}

export default Settings;
