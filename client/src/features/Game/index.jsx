import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "./Header";
import Table from "./Table";
import Sider from "./Sider";
import RoundForm from "./RoundForm";
import { connectToChannel } from "../../utils/api";

const Game = ({ history }) => {
    let socket = useRef(null);
    const { token } = useParams();
    const [me, setMe] = useState({});
    const [users, setUsers] = useState([]);
    const [round, setRound] = useState({
        topic: '',
        result: 'n/a',
        active: false,
    });

    useEffect(() => {
        socket.current = connectToChannel(token);

        socket.current.on('connect', () => console.log('success', socket.current));
        socket.current.on('connect_failed', () => {
            console.error('connect failed');
        });
        socket.current.on('connect_error', () => {
            alert('Can\'t access to the remote server.');

            history.push(`/`);
        })

        socket.current.on('whoami', setMe);
        socket.current.on('userslist', setUsers);
        socket.current.on('round', setRound);

        return () => socket.current.disconnect();
    }, [token, history])

    const handleStartRound = ({ topic }) => {
        socket.current.emit('roundstart', { topic });
    }

    const handleEndRound = () => {
        socket.current.emit('roundend');
    }

    const handleVote = (value) => {
        console.log(value);
        socket.current.emit('vote', { value })
    }

    return (
        <>
            { JSON.stringify(round) }
            { me.moderator && !round.active && (
                <RoundForm onSubmit={handleStartRound} />
            )}
            { !me.moderator && !round.active && (
                // <Scoreboard score={round.result} />
            )}
            { round.active && (
                <Header title={round.topic} showEndRound={me.moderator} onEndRound={handleEndRound} />
            )}
            <div>
                <pre>me: {JSON.stringify(me)}</pre>
                { round.active && <Table onVote={handleVote} />}
                <Sider users={users} />
            </div>
        </>
    );
}

export default Game;