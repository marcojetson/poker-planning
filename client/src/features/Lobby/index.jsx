import React, { useState } from 'react';
import { Form, Button, Card } from "react-bootstrap";
import { register } from '../../utils/api';
import './lobby.css';

const Lobby = ({ history }) => {
    const [nick, setNick] = useState('');
    const [table, setTable] = useState('AhAA sucks');

    const handleChannelChange = (e) => {
        setTable(e.currentTarget.value);
    }

    const handleNickChange = (e) => {
        setNick(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        register(nick, table).then(({ token }) => {
            history.push(`/${token}`);
        }).catch((e) => {
            if (! e.response) {
                alert('Can\'t access to the remote server.');

                return;
            }

            if (e.response && e.response.status === 400) {
                alert('Please fill both inputs and make sure that you use an unique username.');

                return;
            }
        });
    }

    return (
        <Card className="center mt-4">
            <div className="ml-3 mt-3">
              <h1>Lobby</h1>
              <p className="lead mt-2 mb-5">Please choose a name and a table.</p>
            </div>
            <Form onSubmit={handleSubmit} >
                <Form.Group controlId="formBasicEmail" className="mb-3 pr-4">
                    <Form.Label column>Name</Form.Label>
                    <Form.Control value={nick} className="ml-3" placeholder="name" onChange={handleNickChange} autoFocus />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-4 pr-4">
                    <Form.Label column>Table</Form.Label>
                    <Form.Control value={table} className="ml-3" placeholder="table" onChange={handleChannelChange} />
                </Form.Group>

                <Button className="m-3" type="submit" variant="success">
                    Take a seat
                </Button>
            </Form>
        </Card>
    );
};

export default Lobby;
