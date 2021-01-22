import React from 'react';
import * as PropTypes from 'prop-types';
import './sider.css';

const Sider = ({ me, users }) => (
    <div className="sider">
        <h3 className="text-center">Table: {me.table}</h3>
        <ul>
            {users.map(({ nick, moderator }) => (
                <li key={nick}>{nick}{moderator && <> (moderator)</>}</li>
            ))}
        </ul>
    </div>
);

Sider.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        nick: PropTypes.string.isRequired,
        moderator: PropTypes.bool.isRequired,
    }))
};

export default Sider;
