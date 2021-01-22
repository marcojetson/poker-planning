import React from 'react';
import * as PropTypes from 'prop-types';
import './card.css';

const Card = ({ value, onClick }) => (
  <div className="cardWrapper">
    <div className="game-card" onClick={onClick}>
        { value }
    </div>
  </div>
);

Card.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Card;
