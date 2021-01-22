import React, { useState } from 'react';
import {Col, Form, Button, Card} from 'react-bootstrap';
import * as PropTypes from 'prop-types';

const RoundForm = ({ onSubmit, style }) => {
    const [topic, setTopic] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({ topic });
    }

    const handleTopicChange = (e) => {
        setTopic(e.currentTarget.value);
    }

    return (
        <Card style={{ width: '100%', ...style }}>
            <Card.Header className="text-muted">
                Topic
            </Card.Header>
            <Card.Body>
                <Card.Title>Please set the topic and start the voting</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Row className="align-items-center">
                        <Col sm={3} className="my-1">
                            <Form.Label htmlFor="inlineFormInputName" srOnly>
                                Enter topic
                            </Form.Label>
                            <Form.Control placeholder="Enter topic" value={topic} onChange={handleTopicChange} />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" variant="success">Start round</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

RoundForm.defaultValues = {
    style: {},
};

RoundForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
};

export default RoundForm;
