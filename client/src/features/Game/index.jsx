import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "./Header";
import Table from "./Table";
import Sider from "./Sider";
import RoundForm from "./RoundForm";
import { connectToChannel } from "../../utils/api";
import { Container, Row, Col } from 'react-bootstrap'

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
        <Container fluid style={{ marginTop: 20 }}>
            <Row>
                <Col lg={9} md={8} sm={7}> 
                { JSON.stringify(round) }
                { me.moderator && !round.active && (
                    <RoundForm onSubmit={handleStartRound} />
                )}
                { !me.moderator && !round.active && (
                    <div>foo</div>// <Scoreboard score={round.result} />
                )}
                { round.active && (
                    <Header title={round.topic} showEndRound={me.moderator} onEndRound={handleEndRound} />
                )}
                <pre>me: {JSON.stringify(me)}</pre>
                    { round.active && <Table onVote={handleVote} />}
                </Col>
                <Col lg={3} md={4} sm={5}>
                    <Sider me={me} users={users} votes={round.votes} />
                </Col>
            </Row>
        </Container>
    );
}

export default Game;
