import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { register } from '../../utils/api';
import './lobby.css';

const Lobby = ({ history }) => {
    const [nick, setNick] = useState('marco');
    const [table, setTable] = useState('hotwheels');

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
        <div className="center">
            <h1>Lobby</h1>
            <p className="lead">Please choose a name and a table.</p>

            <Form onSubmit={handleSubmit} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={nick} placeholder="name" onChange={handleNickChange} autoFocus />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Table</Form.Label>
                    <Form.Control value={table} placeholder="table" onChange={handleChannelChange} />
                </Form.Group>

                <Button type="submit">
                    Take a seat
                </Button>
            </Form>
        </div>
    );
};

export default Lobby;
