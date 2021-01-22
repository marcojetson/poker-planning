import React from 'react';
import { Button, Card } from "react-bootstrap";
import * as PropTypes from 'prop-types';

const Header = ({ title, showEndRound, onEndRound }) => (
    <Card className="text-center" style={{ width: '100%' }}>
        <Card.Header>
            {title}
        </Card.Header>
        <Card.Body>
            <Card.Title>You can vote now</Card.Title>

            <Card.Text>
                { showEndRound ? (
                    'The voting is in progress and will be active until you (as moderator) end it.'
                ) : (
                    'The voting is in progress. You can cast your vote now.'
                )}
            </Card.Text>

            {showEndRound && <Button variant="success" type="button" onClick={onEndRound}>End round</Button>}
        </Card.Body>
    </Card>
);

Header.defaultProps = {
    showEndRound: false,
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    showEndRound: PropTypes.bool.isRequired,
    onEndRound: PropTypes.func.isRequired,
}

export default Header;
