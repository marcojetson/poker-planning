import React, { Component } from 'react';
import Card from './../Card/index.jsx';
import './index.css';

const Deck = (props) => {

  const gridDeckContainer = props.gridSize === '4' ? 'gridDeckContainerFour' : 'gridDeckContainerThree';
  const cardSize = props.gridSize === '4' ? 'sm' : 'md';

  return (
    <>
      <div className={gridDeckContainer}>
        {
          props.cards.map((card) => {
              <Card
                value={card.value}
                key={card.id}
                id={card.id}
                up={true}
                color={card.color}
                icon={card.icon}
                fixed={true}
                editing={false}
                onClickRemove={() => {}}
                onClick={() => {}}
                size={cardSize}
              />
          })
        }
      </div>
    </>
  );
}

export default Deck;
