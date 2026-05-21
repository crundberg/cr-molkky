import React from 'react';
import { Link } from 'react-router-dom';

function Settings() {
	return (
		<div className="min-h-screen flex flex-col items-center pt-12 px-4">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
					<div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
						<h1 className="text-lg font-bold text-slate-800">Settings</h1>
						<Link
							to="/game"
							className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
						>
							Back to game
						</Link>
					</div>
					<div className="px-5 py-4">
						<p className="text-sm text-slate-400">Settings coming soon...</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
