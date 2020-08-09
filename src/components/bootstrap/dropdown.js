import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DropdownItem from './dropdownItem';
import DropdownDivider from './dropdownDivider';

function Dropdown({ children, text, buttonStyle }) {
	const [isVisible, setVisible] = useState(false);
	const node = useRef();

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);

	const handleToggle = () => setVisible((visible) => !visible);
	const handleClick = (e) => {
		if (!node.current.contains(e.target)) setVisible(false);
	};

	const buttonClassName = classNames(
		'btn btn-secondary dropdown-toggle',
		buttonStyle
	);

	const menuClassName = classNames('dropdown-menu', {
		show: isVisible,
	});

	return (
		<div className="dropdown" ref={node}>
			<button className={buttonClassName} onClick={handleToggle} type="button">
				{text}
			</button>
			<div className={menuClassName}>{children}</div>
		</div>
	);
}

Dropdown.propTypes = {
	text: PropTypes.string,
	children: PropTypes.any,
	buttonStyle: PropTypes.string,
};

Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;

export default Dropdown;
