import React from 'react';
import * as PropTypes from 'prop-types';
import './card.css';

const Card = ({ value, onClick, selected }) => (
  <div className="cardWrapper">
    <div className="game-card" onClick={onClick} style={{ borderColor: selected ? '#FFF' : '#808080' }}>
        { value }
    </div>
  </div>
);

Card.defaultProps = {
    selected: false,
}

Card.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Card;
