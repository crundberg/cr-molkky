import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DropdownItem({ children, href, onClick }) {
	const className =
		'w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors block';

	if (href) {
		return (
			<Link to={href} className={className}>
				{children}
			</Link>
		);
	}

	return (
		<button className={className} type="button" onClick={onClick}>
			{children}
		</button>
	);
}

DropdownItem.propTypes = {
	href: PropTypes.string,
	children: PropTypes.string,
	onClick: PropTypes.func,
};

DropdownItem.defaultProps = {
	href: '',
	children: '',
	onClick: () => null,
};

export default DropdownItem;
