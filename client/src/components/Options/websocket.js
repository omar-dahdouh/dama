export const connect = (onOpen, onError) => {
  const connection = new WebSocket('ws://localhost:12345');
  connection.onopen = onOpen;
  connection.onerror = onError;
};

export const other = async () => {};
