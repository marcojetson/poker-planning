import React from 'react';
import { ReactComponent as PokerCards } from './PokerCards.svg';

const Loading = () => (
    <div style={{ width: '100%', color: '#FFF', fontWeight: 'bolder', fontSize: 32, padding: 10, }}>
        <PokerCards width={100} />
        <span>Loading...</span>
    </div>
);

export default Loading;
