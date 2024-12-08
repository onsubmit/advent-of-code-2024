import { Coordinate, Direction, directions } from '../coordinate';

export const getPartOneSolution = (input: string): string => {
  const lines = input.split('\n');
  const map: Array<Array<string>> = [];

  let guard = new Coordinate(-1, -1);
  for (let row = 0; row < lines.length; row++) {
    const chars = [...lines[row]];
    map.push(chars);

    const guardCol = chars.indexOf('^');
    if (guardCol >= 0) {
      guard.row = row;
      guard.column = guardCol;
    }
  }

  function isValidCoordinate(c: Coordinate): boolean {
    if (c.row < 0 || c.column < 0) {
      return false;
    }

    if (c.row >= map.length || c.column >= map[c.row].length) {
      return false;
    }

    return true;
  }

  let directionIndex = 0;
  let pathLength = 1;
  while (isValidCoordinate(guard)) {
    map[guard.row][guard.column] = 'X';
    let direction = directions[directionIndex % directions.length];
    let next = guard.move(direction);
    if (!isValidCoordinate(next)) {
      break;
    }

    while (map[next.row][next.column] === '#') {
      direction = directions[++directionIndex % directions.length];
      next = guard.move(direction);
    }

    guard = next;
    if (map[guard.row][guard.column] !== 'X') {
      pathLength++;
    }
  }
  return pathLength.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const lines = input.split('\n');
  const map: Array<Array<string>> = [];

  const originalGuard = new Coordinate(-1, -1);
  for (let row = 0; row < lines.length; row++) {
    const chars = [...lines[row]];
    map.push(chars);

    const guardCol = chars.indexOf('^');
    if (guardCol >= 0) {
      originalGuard.row = row;
      originalGuard.column = guardCol;
    }
  }

  function isValidCoordinate(c: Coordinate): boolean {
    if (c.row < 0 || c.column < 0) {
      return false;
    }

    if (c.row >= map.length || c.column >= map[c.row].length) {
      return false;
    }

    return true;
  }

  let loops = 0;
  for (let r = 0; r < map.length; r++) {
    console.log(r);
    for (let c = 0; c < map[r].length; c++) {
      const m = [...map].map((x) => [...x]);
      if (m[r][c] !== '.') {
        continue;
      }

      m[r][c] = '#';

      let guard = new Coordinate(originalGuard.row, originalGuard.column);
      const path: Map<string, Direction> = new Map();
      path.set(`${guard.row},${guard.column}`, 'N');

      let directionIndex = 0;
      while (isValidCoordinate(guard)) {
        let direction = directions[directionIndex % directions.length];
        let next = guard.move(direction);
        if (!isValidCoordinate(next)) {
          break;
        }

        while (m[next.row][next.column] === '#') {
          direction = directions[++directionIndex % directions.length];
          next = guard.move(direction);
        }

        guard = next;
        if (path.get(guard.toString())! === direction) {
          loops++;
          break;
        }

        path.set(guard.toString(), direction);
        m[guard.row][guard.column] = 'X';
      }
    }
  }

  return loops.toString();
};
