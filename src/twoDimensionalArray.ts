import { countArrayBy } from './arrayMethods';
import { Coordinate } from './coordinate';
import { inputTo2dArray } from './inputHelper';

export class TwoDimensionalArray<T> {
  private _array: Array<Array<T>>;

  constructor(
    input: string,
    mapper?: (character: string, row: number, column: number) => T,
    options: Partial<{ columnSplitter: string; retainEmptyLines: boolean }> = {
      columnSplitter: '',
      retainEmptyLines: false,
    }
  ) {
    this._array = mapper ? inputTo2dArray(input, mapper, options) : [];
  }

  clone = (): TwoDimensionalArray<T> => {
    const arr = new TwoDimensionalArray<T>('');
    arr._array = [...this._array].map((x) => [...x]);
    return arr;
  };

  at = (row: number, column: number): T | undefined => this._array[row]?.[column];
  atCoordinate = (coordinate: Coordinate): T | undefined =>
    this.at(coordinate.row, coordinate.column);

  set = (row: number, column: number, value: T): void => {
    if (this.at(row, column) === undefined) {
      throw new Error('Invalid coordinate');
    }

    this._array[row][column] = value;
  };

  setCoordinate = (coordinate: Coordinate, value: T): void => {
    if (this.atCoordinate(coordinate) === undefined) {
      throw new Error('Invalid coordinate');
    }

    this._array[coordinate.row][coordinate.column] = value;
  };

  forEach = (fn: (item: T, row: number, column: number) => void): void => {
    this._array.forEach((items, row) => items.forEach((item, column) => fn(item, row, column)));
  };

  countByRow = (fn: (items: Array<T>, row: number) => boolean): number =>
    countArrayBy(this._array, fn);

  toString = (): string => this._array.map((row) => row.join('')).join('\n');
}
