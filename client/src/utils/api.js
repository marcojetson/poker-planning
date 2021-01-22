import { io } from 'socket.io-client';
import axios from 'axios';

//const address = 'a6a9417a5e5b.ngrok.io';
const address = 'localhost:3001';
const url = `http://${address}`;
const ws = `ws://${address}`;

const route = (endpoint) => `${url}/${endpoint}`

/*
 * The rest endpoints
 */

export const register = (nick, table) => axios.post(route('register'), {
    table,
    nick,
}).then(res => res.data);

/*
 * The socket connection
 */

export const connectToChannel = (token) => io.connect(ws, {
    query: `token=${token}`,
    transports: ['websocket'],
});
