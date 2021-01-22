import React from 'react';
import Card from './Card';
import './table.css';
import * as PropTypes from 'prop-types';

const cards = [1, 2, 3, 5, 'INF'];

const Table = ({ onVote, selected }) => {
    return (
        <>
            <div className="table">
                { cards.map((value) => (
                    <Card
                        key={value}
                        value={value}
                        onClick={() => onVote(value)}
                        selected={value === selected}
                    />
                ))}
            </div>
        </>
    );
};

Table.propTypes = {
    onVote: PropTypes.func.isRequired,
};

export default Table;
