// const http = require('http');
const WebSocket = require('ws');
const { verify } = require('./token');
// const server = http.createServer();
// const wss = new WebSocket.Server({ noServer: true });

const server = new WebSocket.Server({
  port: 12345,
  //   clientTracking: true,
});

const cookieParse = (text) => {
  const parsed = {};
  text.split('; ').forEach((cookie) => {
    const [key, value] = cookie.split('=');
    parsed[key] = decodeURIComponent(value);
  });
  return parsed;
};

// server.on('headers', (headers, request) => {
//
//   headers['Sec-WebSocket-Accept'] = '';
//   console.log(headers);
//   const { user } = cookie;
// });

server.shouldHandle = (request) => {
  const cookie = cookieParse(request.headers.cookie);
  //   const { user } = cookie;

  try {
    verify(cookie.user);
    return true;
  } catch (err) {
    return false;
  }
};

// server.handleUpgrade = (request, socket, head, callback) => {
//   const cookie = cookieParse(request.headers.cookie);

//   callback(socket);
//   //   try {
//   //     const decoded = verify(cookie.user);
//   //     // callback(socket, request, decoded);
//   //     // return true;
//   //     // server.emit('connection', socket, request, decoded);
//   //     callback(socket);
//   //   } catch (err) {
//   //     // return false;
//   //     console.log(err);
//   //     socket.destroy();
//   //   }
// };

server.on('connection', (ws, req) => {
  const cookie = cookieParse(req.headers.cookie);
  //   const { user } = cookie;
  const { login: user } = verify(cookie.user);

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

module.exports = server;
