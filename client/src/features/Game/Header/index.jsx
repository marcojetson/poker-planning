import React from 'react';
import { Button, Card } from "react-bootstrap";
import * as PropTypes from 'prop-types';

const Header = ({ title, showEndRound, onEndRound }) => (
    <Card className="text-center ml-2 mb-2" style={{ width: '98%' }}>
        <Card.Header className="mb-2 text-muted">
            {title}
        </Card.Header>
        <Card.Body>
            <Card.Title>You can vote now</Card.Title>

            <Card.Text className="mb-2 text-muted">
                { showEndRound ? (
                    'The voting is in progress and will be active until you (as moderator) end it.'
                ) : (
                    'The voting is in progress. You can cast your vote now.'
                )}
            </Card.Text>
            {showEndRound && <Button variant="success" type="button" className="mt-4 mb-2" onClick={onEndRound}>End round</Button>}
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
