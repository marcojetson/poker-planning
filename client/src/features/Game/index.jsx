import React from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Header from "./Header";
import Table from "./Table";
import Sider from "./Sider";

const { useEffect } = React;

const Game = () => {
    const { table } = useParams();

    useEffect(() => {
        const socket = io('http://localhost:5000');
        console.info('I will connect to the socket')
    }, [])

    return (
        <>
            <Header title={`The table ${table}`} />
            <div>
                <Table />
                <Sider />
            </div>
        </>
    );
}

export default Game;
