import React from 'react';
import * as PropTypes from 'prop-types';

const Scoreboard = ({ score }) => (
    score ? (
        <span>{score}</span>
    ) : (
        <span>It was a tie.</span>
    )
);

Scoreboard.defaultProps = {
    score: null,
};

Scoreboard.propTypes = {
    score: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

export default Scoreboard;
