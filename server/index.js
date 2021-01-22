const { v4: uuidv4 } = require('uuid');
const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const mode = (array) => {
  if (array.length == 0) {
    return null;
  }

  let modes = [];
  let occurrences = {};
  let maxCount = 1;

  for (let i = 0; i < array.length; i++) {
    const el = array[i];

    if (typeof occurrences[el] === 'undefined') {
      occurrences[el] = 0;
    }

    occurrences[el] += 1;

    if (occurrences[el] > maxCount) {
      modes = [el];
      maxCount = occurrences[el];
    } else if (occurrences[el] === maxCount) {
      modes.push(el);
    }
  }

  return modes.length === 1 ? modes[0] : null;
}

const port = 3001;

const users = [];
const findUserByToken = (token) => users.find((user) => user.token === token);

const tableClients = new Map();
const tableRound = new Map();

app.use(cors());
app.use(bodyParser.json());

const emitUsersList = (table) => {
  io.sockets.in(table).emit('userslist', tableClients.get(table).map(({ nick, moderator }) => ({
    nick,
    moderator,
  })));
};

const emitRound = (table) => {
  const round = tableRound.get(table);

  if (!round) {
    return;
  }

  let votes = { ...round.votes };
  if (round.active) {
    for (let nick in votes) {
      votes[nick] = !!votes[nick];
    }
  }
  
  io.sockets.in(table).emit('round', { ...round, votes });
};

app.post('/register', (req, res) => {
  const { table, nick } = req.body;

  if (!table || !nick) {
    res.status(400).json(['Table and nick are required']);
    return;
  }

  if (users.some((user) => user.table === table && user.nick === nick)) {
    res.status(400).json(['Nick is already in use']);
    return;
  }

  const token = uuidv4();

  users.push({ token, nick, table })

  res.json({ token });
});

io.on('connection', (client) => {
  const { token } = client.handshake.query;
  const currentUser = findUserByToken(token);

  if (!currentUser) {
    console.warn(`Invalid login attempt "${token}"`);
    client.disconnect(0);
    return;
  }

  const { table, nick } = currentUser;

  if (!tableClients.has(table)) {
    tableClients.set(table, []);
  }

  if (tableClients.get(table).find((user) => user.nick === nick)) {
    console.warn(`"${table}/${nick}" is already connected`);
    client.disconnect(0);
    return;
  }

  moderator = tableClients.get(table).length === 0;

  client.nick = nick;
  client.moderator = moderator;
  client.join(table);

  tableClients.get(table).push(client);

  client.emit('whoami', { table, nick, moderator });
  emitRound(table);
  emitUsersList(table);

  client.on('disconnect', () => {
    client.leave(table);
    tableClients.set(table, tableClients.get(table).filter((candidate) => candidate !== client));
    emitUsersList(table);
  });

  client.on('roundstart', ({ topic }) => {
    const round = tableRound.get(table);

    if (round && round.active || !moderator) {
      return;
    }

    tableRound.set(table, {
      topic,
      result: null,
      active: true,
      votes: {},
    })

    emitRound(table);
  });

  client.on('roundend', () => {
    const round = tableRound.get(table);

    if (!round || !round.active || !moderator) {
      return;
    }

    tableRound.set(table, {
      ...round,
      result: mode(Object.values(round.votes)),
      active: false,
    });

    emitRound(table);
  });

  client.on('vote', ({ value }) => {
    const round = tableRound.get(table);

    if (!round || !round.active) {
      return;
    }

    tableRound.set(table, {
      ...round,
      votes: { ...round.votes, [client.nick]: value }
    });

    emitRound(table);
  })
});

http.listen(port);
