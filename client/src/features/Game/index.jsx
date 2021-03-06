import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "./Header";
import Table from "./Table";
import Sider from "./Sider";
import Loading from "./Loading";
import RoundForm from "./RoundForm";
import Scoreboard from "./Scoreboard";
import { connectToChannel } from "../../utils/api";
import { Container, Row, Col } from 'react-bootstrap'

const Game = ({ history }) => {
    let socket = useRef(null);
    const { token } = useParams();
    const [me, setMe] = useState({});
    const [users, setUsers] = useState([]);
    const [round, setRound] = useState({
        topic: '',
        result: undefined,
        active: false,
    });
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

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

        socket.current.on('whoami', (me) => {
            setMe(me);
            setLoading(false);
        });
        socket.current.on('userslist', setUsers);
        socket.current.on('round', setRound);

        return () => socket.current.disconnect();
    }, [token, history])

    const handleStartRound = ({ topic }) => {
        socket.current.emit('roundstart', { topic });
    }

    const handleEndRound = () => {
        socket.current.emit('roundend');
        setSelected(null);
    }

    const handleVote = (value) => {
        socket.current.emit('vote', { value })
        setSelected(value);
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <Container fluid style={{ marginTop: 20 }}>
            <Row>
                <Col lg={9} md={8} sm={7}>
                    {/*<pre>{JSON.stringify(round)}</pre>*/}
                    {/*<pre>me: {JSON.stringify(me)}</pre>*/}

                    { me.moderator && !round.active && (
                        <RoundForm onSubmit={handleStartRound} style={{ marginBottom: 10 }} />
                    )}

                    { round.active && (
                        <Header title={round.topic} showEndRound={me.moderator} onEndRound={handleEndRound} />
                    )}

                    { !round.active && round.result !== undefined && (
                        <Scoreboard topic={round.topic} score={round.result} />
                    )}

                    { round.active && <Table onVote={handleVote} selected={selected} />}
                </Col>

                <Col lg={3} md={4} sm={5}>
                    <Sider me={me} users={users} votes={round.votes || {}} showVotes={!round.active} />
                </Col>
            </Row>
        </Container>
    );
}

export default Game;
