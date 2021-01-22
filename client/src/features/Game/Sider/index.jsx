import React from 'react';
import * as PropTypes from 'prop-types';

const Sider = ({ users }) => (
    <div>
        { users.map((user) => <pre key={user.nick}>{JSON.stringify(user)}</pre>)}
    </div>
);

Sider.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        nick: PropTypes.string.isRequired,
        moderator: PropTypes.bool.isRequired,
    }))
}

export default Sider;
