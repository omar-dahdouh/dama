import React, { useState, useEffect } from 'react';
import Man from '../Man';
import Cell from '../Cell';
import './style.css';
import { getMoveList, getCaptureList } from './logic';

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
  const [cellCount, setCellCount] = useState(Array(100).fill(0));
  const [king, setKing] = useState(Array(32).fill(false));
  const [manPosition, setManPosition] = useState(initManPosition);
  const [manLabel, setManLabel] = useState(Array(32).fill(0));
  const [manDisable, setManDisable] = useState(Array(32).fill(false));
  const [selectedCell, setSelectedCell] = useState(-1);
  const [selectedMan, setSelectedMan] = useState(-1);
  const [moveList, setMoveList] = useState([]);
  const [captureList, setCaptureList] = useState([]);
  const [maxCapture, setMaxCapture] = useState(0);
  const [turn, setTurn] = useState('black');

  const checkMove = (grid, positions, disabled, color) => {
    const newkings = [...king].map(
      (k, i) => k || positions[i] < 20 || positions[i] > 80
    );

    const newMoveList = getMoveList(grid, positions, newkings, disabled, color);
    const newCapList = getCaptureList(
      grid,
      positions,
      newkings,
      disabled,
      color
    );
    const maxVal = Math.max(0, ...newCapList.map(([val]) => val));
    const newLabel = Array(32).fill(0);
    newCapList.forEach(([max, , man]) => {
      newLabel[man] = max;
    });
    setCaptureList(newCapList);
    setMaxCapture(maxVal);
    setManLabel(newLabel);
    setKing(newkings);

    if (maxVal > 0) setMoveList([]);
    else setMoveList(newMoveList);
  };

  useEffect(() => {
    checkMove(cells, manPosition, manDisable, turn);
  }, []);

  const move = (man, cell) => {
    const newCells = [...cells];
    newCells[manPosition[man]] = -1;
    newCells[cell] = man;
    const newPosition = modify(manPosition, man, cell);
    const newCount = Array(100).fill(0);
    const newColors = Array(100).fill('');
    const newTurn = turn === 'black' ? 'white' : 'black';

    checkMove(newCells, newPosition, manDisable, newTurn);

    setCells(newCells);
    setManPosition(newPosition);
    setCellCount(newCount);
    setCellColor(newColors);
    setSelectedMan(-1);
    setSelectedCell(-1);
    setTurn(newTurn);
  };

  const capture = (man, cell) => {
    const mov = captureList.find((mm) => mm[2] === man);
    if (mov) {
      const cap = mov[3].find((mm) => mm[1] === cell);
      if (cap) {
        const newPosition = modify(manPosition, man, cell);
        const newDisable = modify(manDisable, cap[2], true);
        setManDisable(newDisable);
        setManPosition(newPosition);

        const newCells = [...cells];
        newCells[manPosition[cap[2]]] = -1;
        newCells[mov[1]] = -1;
        newCells[cell] = man;
        setCells(newCells);

        if (maxCapture > 1) {
          const newCapList = [[maxCapture - 1, cell, man, cap[3]]];
          const newColors = Array(100).fill('');
          const newCount = Array(100).fill(0);
          const newLabel = modify(Array(32).fill(0), man, maxCapture - 1);

          cap[3].forEach(([max, pos]) => {
            newColors[pos] = max + 1 === maxCapture - 1 ? 'red' : 'gray';
            newCount[pos] = max + 1;
          });

          setCellCount(newCount);
          setCellColor(newColors);
          setManLabel(newLabel);
          setSelectedCell(cell);
          setMoveList([]);
          setCaptureList(newCapList);
          setMaxCapture(maxCapture - 1);
        } else {
          const newTurn = turn === 'black' ? 'white' : 'black';
          setSelectedMan(-1);
          setSelectedCell(-1);
          setCellCount(Array(100).fill(0));
          setCellColor(Array(100).fill(''));
          checkMove(newCells, newPosition, newDisable, newTurn);
          setTurn(newTurn);
        }
      }
    }
  };

  const onCellClick = (cell) => {
    if (cellColor[cell] === 'green') {
      move(selectedMan, cell);
    } else if (cellColor[cell] === 'red') {
      capture(selectedMan, cell);
    } else if (cellColor[cell] === '') {
      setSelectedMan(-1);
      setSelectedCell(-1);
      setCellCount(Array(100).fill(0));
      setCellColor(Array(100).fill(''));
    }
  };

  const onManClick = (id) => {
    if (selectedMan === id) return;
    if (manDisable[id]) return;

    const position = manPosition[id];
    const newColors = Array(100).fill('');

    moveList
      .filter(([man]) => man === id)
      .forEach((mov) => {
        newColors[mov[1]] = 'green';
      });

    const newCount = Array(100).fill(0);
    const list = captureList.find((mov) => mov[2] === id);

    if (list) {
      list[3].forEach(([max, pos]) => {
        newColors[pos] = max + 1 === maxCapture ? 'red' : 'gray';
        newCount[pos] = max + 1;
      });
    }
    setCellCount(newCount);

    setCellColor(newColors);
    setSelectedMan(id);
    setSelectedCell(position);
  };

  return (
    <div className="board">
      {manPosition.map((pos, index) => (
        <Man
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          id={index}
          disable={manDisable[index]}
          label={manLabel[index]}
          gray={maxCapture !== manLabel[index]}
          onClick={onManClick}
          position={pos}
          white={index < 16}
          king={king[index]}
        />
      ))}
      {allCells.map((v) => (
        <Cell
          key={v}
          count={cellCount[v]}
          position={v}
          color={cellColor[v]}
          selected={selectedCell === v}
          click={onCellClick}
        />
      ))}
      <button
        type="button"
        style={{
          position: 'absolute',
          top: '-20px',
        }}
        onClick={() => {
          if (selectedMan >= 0)
            setKing(modify(king, selectedMan, !king[selectedMan]));
        }}
      >
        king
      </button>
    </div>
  );
}

export default Board;
