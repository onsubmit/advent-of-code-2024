export const directions = ['N', 'E', 'S', 'W'] as const;
export type Direction = (typeof directions)[number];
export class Coordinate {
  row: number;
  column: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  plus = (c: Coordinate): Coordinate => new Coordinate(this.row + c.row, this.column + c.column);
  minus = (c: Coordinate): Coordinate => new Coordinate(this.row - c.row, this.column - c.column);
  toString = (): string => `${this.row},${this.column}`;
  move = (direction: Direction): Coordinate => {
    const { row, column } = this;
    switch (direction) {
      case 'N': {
        return new Coordinate(row - 1, column);
      }
      case 'E': {
        return new Coordinate(row, column + 1);
      }
      case 'S': {
        return new Coordinate(row + 1, column);
      }
      case 'W': {
        return new Coordinate(row, column - 1);
      }
    }
  };
}
