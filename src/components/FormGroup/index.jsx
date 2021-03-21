import React from 'react';
import PropTypes from 'prop-types';
import './formGroup.scss';

export default function FormGroup({ label, children }) {
  return <div className="form-group">
    <label className="label">{label}</label>
    <div className="form-group-input">
      {children}
    </div>
  </div>
}

FormGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  label: PropTypes.string.isRequired
}