import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

export default function Input({ onChange, ...otherProps }) {
  return <input className="input" onChange={onChange} {...otherProps} />
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired
}
