import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';

export default function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}