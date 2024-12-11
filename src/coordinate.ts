export const cardinalDirections = ['N', 'E', 'S', 'W'] as const;
export type CardinalDirection = (typeof cardinalDirections)[number];

export const ordinalDirections = ['NE', 'NW', 'SE', 'SW'] as const;
export type OrindalDirection = (typeof ordinalDirections)[number];

export const directions = [...cardinalDirections, ...ordinalDirections] as const;
export type Direction = (typeof directions)[number];
export class Coordinate {
  row: number;
  column: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  clone = (): Coordinate => {
    return new Coordinate(this.row, this.column);
  };

  equals = (c: Coordinate) => this.row === c.row && this.column === c.column;

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
      case 'NE': {
        return new Coordinate(row - 1, column + 1);
      }
      case 'SE': {
        return new Coordinate(row + 1, column + 1);
      }
      case 'SW': {
        return new Coordinate(row + 1, column - 1);
      }
      case 'NW': {
        return new Coordinate(row - 1, column - 1);
      }
    }
  };
}
