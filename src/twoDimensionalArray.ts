import { countArrayBy } from './arrayMethods';
import { Coordinate } from './coordinate';
import { inputTo2dArray } from './inputHelper';

export class TwoDimensionalArray<T> {
  private _array: Array<Array<T>>;

  constructor(
    input: string,
    mapper: (character: string, row: number, column: number) => T,
    options: Partial<{ columnSplitter: string; retainEmptyLines: boolean }> = {
      columnSplitter: '',
      retainEmptyLines: false,
    }
  ) {
    this._array = inputTo2dArray(input, mapper, options);
  }

  at = (row: number, column: number): T | undefined => this._array[row]?.[column];
  atCoordinate = (coordinate: Coordinate): T | undefined =>
    this.at(coordinate.row, coordinate.column);

  forEach = (fn: (item: T, row: number, column: number) => void): void => {
    this._array.forEach((items, row) => items.forEach((item, column) => fn(item, row, column)));
  };

  countByRow = (fn: (items: Array<T>, row: number) => boolean): number =>
    countArrayBy(this._array, fn);
}
