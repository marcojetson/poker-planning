import React from 'react';
import * as PropTypes from 'prop-types';

const Scoreboard = ({ topic, score }) => (
    <div className="jumbotron">
        <h1 className="display-4">
            {score ? (
                <span>{score}</span>
            ) : (
                <span>It is a tie.</span>
            )}
        </h1>
        <p className="lead">
            points
        </p>
        <hr className="my-4" />
        <p>{topic}</p>
    </div>
);

Scoreboard.defaultProps = {
    score: null,
};

Scoreboard.propTypes = {
    score: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    topic: PropTypes.string.isRequired,
};

export default Scoreboard;
