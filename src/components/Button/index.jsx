import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export default function Button({ children, onClick, type, ...otherProps }) {
  return <button className={type ? `btn btn-${type}` : `btn`} onClick={onClick} {...otherProps}>{children}</button>
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func.isRequired
}