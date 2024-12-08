export type Coordinate = { row: number; column: number };

export const getDistance = (a: Coordinate, b: Coordinate): Coordinate => {
  return {
    row: a.row - b.row,
    column: a.column - b.column,
  };
};

export const invert = (c: Coordinate): Coordinate => {
  return {
    row: 0 - c.row,
    column: 0 - c.column,
  };
};

export const add = (a: Coordinate, b: Coordinate): Coordinate => {
  return {
    row: a.row + b.row,
    column: a.column + b.column,
  };
};
