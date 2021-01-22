import React from 'react';
import CardFactory from './CardFactory.js';
import FrontFace from './FrontFace.js';
import BackFace from './BackFace.js';
import classNames from 'classnames';
import './card.css';

const Card = ({
  value,
  up,
  id,
  editing,
  icon,
  color,
  className,
  fixed,
  onClick,
  onClickRemove,
  time,
  size,
  pattern
}) => {

  const handleClick = event => {
    event.preventDefault();
    if (fixed) {
      const card = CardFactory.create(id, color, value, icon);
      onClick(event, card);
    }
    else {
      !fixed && event.currentTarget.classList.toggle('flipped');
    }
  }

  const wrapperClasses = classNames(
    'cardWrapper',
    className,
    {
      'wrapperSm': size === 'sm',
      'wrapperMd': size === 'md',
      'wrapperLg': size === 'lg'
    }
  );

  const classes = classNames(
    'card',
    {
      'flipped': up,
      'cardSm': size === 'sm',
      'cardMd': size === 'md',
      'cardLg': size === 'lg'
    }
  );

  return (
    <div>
      <div className={wrapperClasses}>
        <div className="cardContainer">
          <div className={classes} onClick={handleClick}>
            <FrontFace />
              <BackFace icon={icon} color={color} value={value} pattern={'tech-pattern'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
