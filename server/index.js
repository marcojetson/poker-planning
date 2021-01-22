const { v4: uuidv4 } = require('uuid');
const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 3002;

let users = [];

app.use(cors());
app.use(bodyParser.json());

const emitWhoAmI = (client, { channel, nick }) => {
  client.emit('whoami', { channel, nick });
};

const emitUsersList = (channel) => {
  io.sockets.in(channel).emit('userslist', users.filter((user) => user.connected && user.channel === channel).map(({ nick }) => ({ nick })));
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

  users.push({
    token,
    nick,
    channel,
    connected: false,
  })

  res.json({ token });
});  

io.on('connection', (client) => {
  const { token } = client.handshake.query;
  const user = users.find((user) => user.token === token);

  if (!user) {
    console.warn(`Invalid login attempt "${token}"`);
    client.disconnect(0);
    return;
  }

  if (user.connected) {
    console.warn(`"${user.channel}/${user.nick}" is already connected`);
    client.disconnect(0);
    return;
  }

  user.connected = true;
  client.join(user.channel);

  client.on('disconnect', () => {
    user.connected = false;
    client.leave(user.channel);
    emitUsersList();
  });

  emitWhoAmI(client, user);
  emitUsersList(user.channel);
});

http.listen(port);
