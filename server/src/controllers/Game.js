let nextID = 1;

exports.newGame = async (owner) => {
  const arr4 = [21, 23, 45, 47];
  const initManPosition = Array(32)
    .fill()
    .map((v, i) => i + arr4[Math.floor(i / 8)]);

  const initCells = Array(100).fill(-1);
  initManPosition.forEach((v, i) => {
    initCells[v] = i;
  });

  for (let i = 0; i < 10; i += 1) {
    initCells[i] = 32;
    initCells[i * 10] = 32;
    initCells[i + 90] = 32;
    initCells[i * 10 + 9] = 32;
  }
  const game = {
    id: nextID,
    owner,
    cells: initCells,
    cellColor: Array(100).fill(''),
    cellCount: Array(100).fill(0),
    king: Array(32).fill(false),
    manPosition: initManPosition,
    manLabel: Array(32).fill(0),
    manDisable: Array(32).fill(false),
    moveList: [],
    captureList: [],
    maxCapture: 0,
    turn: ['black', 'white'][Math.floor(Math.random() * 2)],
  };

  nextID += 1;
  return game;
};
