import { io } from 'socket.io-client';
import axios from 'axios';

const address = '54c7332de162.ngrok.io';
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
