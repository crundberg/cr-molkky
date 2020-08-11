import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DropdownItem({ children, href, onClick }) {
	if (href) {
		return (
			<Link to={href} className="dropdown-item">
				{children}
			</Link>
		);
	}

	return (
		<button className="dropdown-item" type="button" onClick={onClick}>
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
	onClick: () => {},
};

export default DropdownItem;
