import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DropdownItem from './dropdownItem';
import DropdownDivider from './dropdownDivider';

function Dropdown({ children, text }) {
	const [isVisible, setVisible] = useState(false);
	const node = useRef();

	useEffect(() => {
		const handleClick = (e) => {
			if (!node.current.contains(e.target)) setVisible(false);
		};
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, []);

	return (
		<div className="relative" ref={node}>
			<button
				className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors font-medium text-slate-700"
				onClick={() => setVisible((v) => !v)}
				type="button"
			>
				{text}
				<svg
					className="w-3.5 h-3.5 text-slate-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{isVisible && (
				<div
					className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50"
					data-testid="dropdown-menu"
				>
					{children}
				</div>
			)}
		</div>
	);
}

Dropdown.propTypes = {
	text: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;

export default Dropdown;
