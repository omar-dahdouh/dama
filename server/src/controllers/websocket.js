// const http = require('http');
const { Server } = require('ws');
const { verify } = require('./token');

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

  console.log('user');
  console.log(user);

  ws.on('message', (message) => {
    console.log(message);
    console.log(user);
  });
});

server.on('close', () => {
  console.log('close');
});

server.on('error', () => {
  console.log('error');
});
