import { io } from 'socket.io-client';
import axios from 'axios';
import process from 'process';

const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const address = 'localhost:3001';
const url = development ? `http://${address}` : '';
const ws = development ? `ws://${address}` : '';

const route = (endpoint) => `${url}/rest/${endpoint}`;

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
