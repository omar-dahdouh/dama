const { location } = window;
const protocol = location.protocol.replace('http', 'ws');
const { hostname } = location;
const HOST = `${protocol}//${hostname}:5050`;
let connection;

export const connect = (setConnected, setConnecting, setGameList) => {
  connection = new WebSocket(HOST);

  connection.onopen = () => {
    setConnected(true);
    setConnecting(false);
  };

  connection.onclose = () => {
    setConnected(false);
  };

  connection.onerror = () => {
    setConnecting(false);
  };

  connection.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // console.log('server data');
    console.log(data);
    const { type } = data;
    if (type === 'game list') {
      setGameList(data.list);
    }
  };
};

function send(data) {
  if (connection.readyState === WebSocket.OPEN) {
    const message = JSON.stringify(data);
    console.log('send message');
    console.log(message);
    connection.send(message);
  } else {
    throw 'not connected';
  }
}

export const createGame = async () => {
  send({
    type: 'create game',
  });
};
