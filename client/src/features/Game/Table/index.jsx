import React from 'react';
import DeckList from './DeckList.jsx';
import Deck from './Deck/index.jsx';

const Table = (props) => {

    return (
      <div className="decks">
            <DeckList >
              { props.decks.map(deck =>
                <Deck
                  key={deck.id}
                  title={deck.description}
                  cards={deck.cards}>
                </Deck>
              )}
            </DeckList>
        </div>
    );
}

export default Table;
