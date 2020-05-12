import React, { useState, useEffect } from 'react';
import Man from '../Man';
import Cell from '../Cell';
import './style.css';

const arr4 = [21, 23, 45, 47];
const initManPosition = Array(32)
  .fill()
  .map((v, i) => i + arr4[Math.floor(i / 8)]);

const initCells = Array(100).fill(-1);
initManPosition.forEach((v, i) => {
  initCells[v] = i;
});

const allCells = Array(64)
  .fill()
  .map((v, i) => Math.floor(i / 8) * 10 + (i % 8) + 11);

for (let i = 0; i < 10; i += 1) {
  initCells[i] = 32;
  initCells[i * 10] = 32;
  initCells[i + 90] = 32;
  initCells[i * 10 + 9] = 32;
}

const modify = (oldArr, index, value) => {
  const newArr = [...oldArr];
  newArr[index] = value;
  return newArr;
};

function Board() {
  const [cells, setCells] = useState(initCells);
  const [cellColor, setCellColor] = useState(Array(100).fill(''));
  const [king, setKing] = useState(Array(32).fill(false));
  const [manPosition, setManPosition] = useState(initManPosition);
  const [selectedCell, setSelectedCell] = useState(-1);
  const [selectedMan, setSelectedMan] = useState(-1);
  const [moves, setMoves] = useState([]);

  const getData = (id) => ({
    x: manPosition[id] % 10,
    y: Math.floor(manPosition[id] / 10),
    position: manPosition[id],
    color: id < 16 ? 'white' : 'black',
    isKing: king[id],
  });

  const getMoves = () => {
    const newMoves = [];

    for (let m = 0; m < 32; m += 1) {
      const { color, position, isKing } = getData(m);
      if (isKing) {
        [-10, 1, 10, -1].forEach((d) => {
          let pos = position + d;
          while (cells[pos] !== 32) {
            if (cells[pos] !== -1) break;
            newMoves.push([m, pos]);
            pos += d;
          }
        });
      } else {
        if (color === 'white' && cells[position + 10] === -1)
          newMoves.push([m, position + 10]);

        if (color === 'black' && cells[position - 10] === -1)
          newMoves.push([m, position - 10]);

        if (cells[position - 1] === -1) newMoves.push([m, position - 1]);
        if (cells[position + 1] === -1) newMoves.push([m, position + 1]);
      }
    }
    setMoves(newMoves);
  };

  useEffect(() => {
    getMoves();
  }, [manPosition]);

  const move = (man, cell) => {
    const newCells = [...cells];
    newCells[manPosition[man]] = -1;
    newCells[cell] = man;
    setCells(newCells);
    setManPosition(modify(manPosition, man, cell));

    setSelectedMan(-1);
    setSelectedCell(-1);
    setCellColor(Array(100).fill(''));

    if (cell < 20 || cell > 80) {
      setKing(modify(king, man, true));
    }
  };

  const onCellClick = (cell) => {
    if (cellColor[cell] === 'green') {
      move(selectedMan, cell);
    }
  };

  const onManClick = (id) => {
    const { position } = getData(id);

    const newColors = Array(64).fill('');
    moves
      .filter(([man]) => man === id)
      .forEach((mov) => {
        newColors[mov[1]] = 'green';
      });
    setCellColor(newColors);

    setSelectedMan(id);
    setSelectedCell(position);
  };

  return (
    <>
      <div className="board">
        {manPosition.map((pos, index) => (
          <Man
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            id={index}
            label={0}
            onClick={onManClick}
            position={pos}
            white={index < 16}
            king={king[index]}
          />
        ))}

        {allCells.map((v) => (
          <Cell
            key={v}
            count={0}
            position={v}
            color={cellColor[v]}
            selected={selectedCell === v}
            click={onCellClick}
          />
        ))}
      </div>
    </>
  );
}

export default Board;
