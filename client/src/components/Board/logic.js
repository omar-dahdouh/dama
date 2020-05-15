export const getColor = (id) => (id < 16 ? 'white' : 'black');

export const getManCapture = (grid, color, position, man, dir) => {
  if ((color === 'white' && dir === 0) || (color === 'black' && dir === 2))
    return [0, position, man, []];

  const dirs = [-10, 1, 10, -1];
  const pos1 = position + dirs[dir];
  const pos2 = pos1 + dirs[dir];
  const obj1 = grid[pos1];
  if (
    obj1 !== 32 &&
    obj1 !== -1 &&
    getColor(obj1) !== color &&
    grid[pos2] !== 32 &&
    grid[pos2] === -1
  ) {
    const d1 = getManCapture(grid, color, pos2, obj1, dir);
    const d2 = getManCapture(grid, color, pos2, obj1, (dir + 1) % 4);
    const d3 = getManCapture(grid, color, pos2, obj1, (dir + 3) % 4);

    const all = d1[3].concat(d2[3]).concat(d3[3]);
    const max = Math.max(d1[0], d2[0], d3[0]);
    return [max + 1, pos1, man, [[max, pos2, obj1, all]]];
  }
  return [0, position, man, []];
};

export const getKingCapture = (grid0, color, position, man, dir) => {
  const grid = [...grid0];
  const dd = [-10, 1, 10, -1][dir];

  let pos = position + dd;
  while (grid[pos] !== 32) {
    if (grid[pos] !== -1) {
      if (getColor(grid[pos]) === color) break;

      const prevPos = pos;
      const prevVal = grid[pos];
      pos += dd;
      if (grid[pos] === -1) {
        grid[prevPos] = -1;

        const tree = [0, prevPos, man, []];
        const common = getKingCapture(grid, color, pos, prevVal, dir);

        while (grid[pos] !== 32) {
          const lft = getKingCapture(grid, color, pos, prevVal, (dir + 1) % 4);
          const rit = getKingCapture(grid, color, pos, prevVal, (dir + 3) % 4);

          tree[3].push([
            Math.max(tree[0], lft[0], rit[0], common[0]),
            pos,
            prevVal,
            lft[3].concat(rit[3]).concat(common[3]),
          ]);

          pos += dd;
          if (grid[pos] !== -1) break;
        }
        tree[0] = Math.max(...tree[3].map((v) => v[0])) + 1;
        grid[prevPos] = prevVal;
        return tree;
      }
      break;
    } else pos += dd;
  }
  return [0, position, man, []];
};

export const getCaptureList = (cells, positions, kings, disabled, color) => {
  const newCaptureList = [];
  const grid = [...cells];

  for (let man = 0; man < 32; man += 1) {
    if (!disabled[man] && getColor(man) === color) {
      const pos = positions[man];

      const tree = [0, pos, man, []];
      grid[pos] = -1;
      if (kings[man]) {
        for (let dir = 0; dir < 4; dir += 1) {
          tree[3] = tree[3].concat(
            getKingCapture(grid, color, pos, man, dir)[3]
          );
        }
      } else {
        for (let dir = 0; dir < 4; dir += 1) {
          tree[3] = tree[3].concat(
            getManCapture(grid, color, pos, man, dir)[3]
          );
        }
      }
      grid[pos] = man;

      tree[0] = Math.max(0, ...tree[3].map((v) => v[0])) + 1;
      if (tree[3].length > 0) newCaptureList.push(tree);
    }
  }

  return newCaptureList;
};

export const getMoveList = (cells, positions, kings, disabled, color) => {
  const newMoveList = [];

  for (let man = 0; man < 32; man += 1) {
    if (!disabled[man] && getColor(man) === color) {
      const position = positions[man];
      const isKing = kings[man];

      if (isKing) {
        [-10, 1, 10, -1].forEach((d) => {
          let pos = position + d;
          while (cells[pos] !== 32) {
            if (cells[pos] !== -1) break;
            newMoveList.push([man, pos]);
            pos += d;
          }
        });
      } else {
        if (color === 'white' && cells[position + 10] === -1)
          newMoveList.push([man, position + 10]);

        if (color === 'black' && cells[position - 10] === -1)
          newMoveList.push([man, position - 10]);

        if (cells[position - 1] === -1) newMoveList.push([man, position - 1]);
        if (cells[position + 1] === -1) newMoveList.push([man, position + 1]);
      }
    }
  }
  return newMoveList;
};
