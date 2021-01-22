import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { register } from '../../utils/api';

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
                alert('Please fill both inputs.');

                return;
            }
        });
    }

    return (
        <div>
            <h1>Lobby</h1>
            <form onSubmit={handleSubmit} >
                <Input value={nick} placeholder="name" onChange={handleNickChange} />
                <Input value={table} placeholder="table" onChange={handleChannelChange} autoFocus />
                <Button type="submit">
                    Take a seat
                </Button>
            </form>
        </div>
    );
}

export default Lobby;
