export const connect = (onOpen, onError) => {
  const { location } = window;
  const protocol = location.protocol.replace('http', 'ws');
  const { hostname } = location;
  const HOST = `${protocol}//${hostname}:5050`;
  const connection = new WebSocket(HOST);

  connection.onopen = onOpen;
  connection.onerror = onError;
};

export const other = async () => {};
