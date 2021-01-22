import React from 'react';
import * as PropTypes from 'prop-types';
import { Badge, ListGroup } from 'react-bootstrap';
import './sider.css';

const Sider = ({ me, users, votes, showVotes }) => (
    <div>
        <ListGroup>
            <ListGroup.Item variant="secondary">{me.table}</ListGroup.Item>
            {users.map(({ nick, moderator }) => (
                <ListGroup.Item key={nick}>
                    {nick}
                    {moderator && <span className="float-right">👮</span>}
                    {me.nick === nick && <span className="float-right">👈🏼</span>}
                    {votes[nick] && !showVotes && <span className="float-right">✔️</span>}
                    {votes[nick] && showVotes && <Badge className="float-right" style={{ marginTop: 3, marginRight: 3 }} variant="secondary">{votes[nick]}</Badge>}
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
};

export default Sider;
