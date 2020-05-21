// const http = require('http');
const { Server } = require('ws');
const { verify } = require('./token');
// const { newGame } = require('./Game');

const gameList = [];
// const nextID = 0;

const cookieParse = (text) => {
  const parsed = {};
  text.split('; ').forEach((cookie) => {
    const [key, value] = cookie.split('=');
    parsed[key] = decodeURIComponent(value);
  });
  return parsed;
};

const server = new Server({ port: 5050 });

server.shouldHandle = (request) => {
  const cookie = cookieParse(request.headers.cookie);

  try {
    verify(cookie.user);
    return true;
  } catch (err) {
    return false;
  }
};

server.on('connection', (ws, req) => {
  console.log('connection');

  const cookie = cookieParse(req.headers.cookie);
  const { login: user } = verify(cookie.user);

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      const { type } = data;
      if (type === 'create game') {
        // const game = newGame(user);
        if (gameList.indexOf(user) === -1) {
          gameList.push(user);
        }
        server.clients.forEach((client) => {
          client.send(
            JSON.stringify({
              type: 'game list',
              list: gameList,
            })
          );
        });
      }
      console.log(data);
    } catch (error) {}
  });
});

server.on('close', () => {
  console.log('close');
});

server.on('error', () => {
  console.log('error');
});
