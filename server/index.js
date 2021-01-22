const { v4: uuidv4 } = require('uuid');
const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 3001;

const users = [];
const channelUsers = new Map();

app.use(cors());
app.use(bodyParser.json());

const emitUsersList = (channel) => {
  io.sockets.in(channel).emit('userslist', channelUsers.get(channel).map(({ nick, moderator }) => ({
    nick,
    moderator,
  })));
};

app.post('/register', (req, res) => {
  const { channel, nick } = req.body;

  if (!channel || !nick) {
    res.status(400).json(['Channel and nick are required']);
    return;
  }

  if (users.some((user) => user.channel === channel && user.nick === nick)) {
    res.status(400).json(['Nick is already in use']);
    return;
  }

  const token = uuidv4();

  users.push({ token, nick, channel })

  res.json({ token });
});  

io.on('connection', (client) => {
  const { token } = client.handshake.query;
  const userIndex = users.findIndex((user) => user.token === token);

  if (userIndex === -1) {
    console.warn(`Invalid login attempt "${token}"`);
    client.disconnect(0);
    return;
  }

  const { channel, nick } = users[userIndex];

  if (!channelUsers.has(channel)) {
    channelUsers.set(channel, []);
  }

  if (channelUsers.get(channel).find((user) => user.nick === nick)) {
    console.warn(`"${channel}/${nick}" is already connected`);
    client.disconnect(0);
    return;
  }

  moderator = channelUsers.get(channel).length === 0;

  client.nick = nick;
  client.moderator = moderator;
  client.join(channel);

  channelUsers.get(channel).push(client);

  client.on('disconnect', () => {
    client.leave(channel);
    channelUsers.set(channel, channelUsers.get(channel).filter((candidate) => candidate !== client));
    emitUsersList();
  });

  client.emit('whoami', { channel, nick, moderator });
  emitUsersList(channel);
});

http.listen(port);
