import { Coordinate } from './coordinate';
import { inputTo2dArray } from './inputHelper';

export class TwoDimensionalArray<T> {
  private _array: Array<Array<T>>;

  constructor(
    input: string,
    mapper: (character: string, row: number, column: number) => T,
    options: { columnSplitter: string; retainEmptyLines: boolean } = {
      columnSplitter: '',
      retainEmptyLines: false,
    }
  ) {
    this._array = inputTo2dArray(input, mapper, options);
  }

  atCoordinate = (coordinate: Coordinate): T | undefined =>
    this.at(coordinate.row, coordinate.column);
  at = (row: number, column: number): T | undefined => this._array[row]?.[column];

  forEach = (fn: (item: T, row: number, column: number) => void): void => {
    this._array.forEach((items, row) => items.forEach((item, column) => fn(item, row, column)));
  };
}
