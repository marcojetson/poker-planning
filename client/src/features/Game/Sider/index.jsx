import React from 'react';
import * as PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import './sider.css';

const Sider = ({ users }) => (
    <div>
        <ListGroup>
            {users.map(({ nick, moderator }) => (
                <ListGroup.Item key={nick}>
                    {nick}
                    {moderator && <span className="float-right">👮</span>}
                </ListGroup.Item>
            ))}
        </ListGroup>
    </div>
);

Sider.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        nick: PropTypes.string.isRequired,
        moderator: PropTypes.bool.isRequired,
    })),
}

export default Sider;
