import React from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Lobby = ({ history }) => {
    const handleJoin = () => history.push('/table/123');

    return (
        <div>
            <h1>Lobby</h1>
            <div>
                <Input placeholder="table" />
                <Input placeholder="name" />
                <Button onClick={handleJoin}>
                    Take a seat
                </Button>
            </div>
        </div>
    );
}

export default Lobby;
