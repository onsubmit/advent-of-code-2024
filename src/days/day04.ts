import { inputTo2dArray } from '../inputHelper';

const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;
type Direction = (typeof directions)[number];

export const getPartOneSolution = (input: string): string => {
  const matrix = inputTo2dArray(input, '', (char) => char);
  const rows = matrix.length;
  const columns = matrix[0].length;

  let sum = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const found = findXmasAt(matrix, r, c);
      sum += found;
    }
  }

  return sum.toString();
};

export const getPartTwoSolution = (input: string): string => {
  return '';
};

const findXmasAt = (matrix: Array<Array<string>>, row: number, column: number): number => {
  if (matrix[row]?.[column] !== 'X') {
    return 0;
  }

  let found = 0;
  for (const direction of directions) {
    let r = row;
    let c = column;
    let broke = false;
    for (const next of ['M', 'A', 'S']) {
      const newCoords = getCoordinatesInDirection(r, c, direction);
      r = newCoords.row;
      c = newCoords.column;
      if (matrix[r]?.[c] !== next) {
        broke = true;
        break;
      }
    }

    if (!broke) {
      found++;
    }
  }

  return found;
};

const getCoordinatesInDirection = (
  row: number,
  column: number,
  direction: Direction
): { row: number; column: number } => {
  switch (direction) {
    case 'N': {
      return {
        row: row - 1,
        column,
      };
    }
    case 'NE': {
      return {
        row: row - 1,
        column: column + 1,
      };
    }
    case 'E': {
      return {
        row,
        column: column + 1,
      };
    }
    case 'SE': {
      return {
        row: row + 1,
        column: column + 1,
      };
    }
    case 'S': {
      return {
        row: row + 1,
        column,
      };
    }
    case 'SW': {
      return {
        row: row + 1,
        column: column - 1,
      };
    }
    case 'W': {
      return {
        row,
        column: column - 1,
      };
    }
    case 'NW': {
      return {
        row: row - 1,
        column: column - 1,
      };
    }
  }
};
