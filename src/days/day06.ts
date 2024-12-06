import { Coordinate } from '../coordinate';

const directions = ['N', 'E', 'S', 'W'] as const;
type Direction = (typeof directions)[number];

export const getPartOneSolution = (input: string): string => {
  const lines = input.split('\n');
  const map: Array<Array<string>> = [];

  let guard: Coordinate = { row: -1, column: -1 };
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
    let next = move(guard, direction);
    if (!isValidCoordinate(next)) {
      break;
    }

    while (map[next.row][next.column] === '#') {
      direction = directions[++directionIndex % directions.length];
      next = move(guard, direction);
    }

    guard = next;
    if (map[guard.row][guard.column] !== 'X') {
      pathLength++;
    }
  }
  return pathLength.toString();
};

const move = (c: Coordinate, direction: Direction): Coordinate => {
  const { row, column } = c;
  switch (direction) {
    case 'N': {
      return {
        row: row - 1,
        column,
      };
    }
    case 'E': {
      return {
        row: row,
        column: column + 1,
      };
    }
    case 'S': {
      return {
        row: row + 1,
        column,
      };
    }
    case 'W': {
      return {
        row: row,
        column: column - 1,
      };
    }
  }
};

const pathChars = ['|', '-', '+'] as const;
type PathChar = (typeof pathChars)[number];

export const getPartTwoSolution = (input: string): string => {
  const lines = input.split('\n');
  const map: Array<Array<string>> = [];

  const originalGuard: Coordinate = { row: -1, column: -1 };
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

      let guard = { ...originalGuard };
      const path: Map<string, Direction> = new Map();
      path.set(`${guard.row},${guard.column}`, 'N');

      let directionIndex = 0;
      while (isValidCoordinate(guard)) {
        let direction = directions[directionIndex % directions.length];
        let next = move(guard, direction);
        if (!isValidCoordinate(next)) {
          break;
        }

        while (m[next.row][next.column] === '#') {
          direction = directions[++directionIndex % directions.length];
          next = move(guard, direction);
        }

        guard = next;
        if (path.get(`${guard.row},${guard.column}`) === direction) {
          loops++;
          break;
        }

        path.set(`${guard.row},${guard.column}`, direction);
        m[guard.row][guard.column] = 'X';
      }
    }
  }

  return loops.toString();
};
