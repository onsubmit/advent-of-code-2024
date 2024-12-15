import { sumArray } from '../arrayMethods';
import { CardinalDirection, Coordinate } from '../coordinate';
import { TwoDimensionalArray } from '../twoDimensionalArray';

export const getPartOneSolution = (input: string): string => {
  const warehouse = new Warehouse(input);
  warehouse.go();
  const gpsCoords = warehouse.getGpsCoordsOfBoxes();
  return sumArray(gpsCoords).toString();
};

const WALL = '#';
const EMPTY = '.';
const BOX = 'O';
const ROBOT = '@';

const UP = '^' as const;
const DOWN = 'v' as const;
const LEFT = '<' as const;
const RIGHT = '>' as const;

type MapObject = '#' | '.' | 'O' | '@';
type Arrow = '^' | 'v' | '<' | '>';
const directionMap: Record<Arrow, CardinalDirection> = {
  [UP]: 'N',
  [DOWN]: 'S',
  [LEFT]: 'W',
  [RIGHT]: 'E',
};

class Warehouse {
  private _warehouse: TwoDimensionalArray<MapObject | Arrow>;
  private _moves: Array<Arrow>;
  private _robot: Coordinate = new Coordinate(-1, -1);

  constructor(input: string) {
    const parts = input.split('\n\n');
    this._warehouse = new TwoDimensionalArray<MapObject | Arrow>(parts[0], (char, row, column) => {
      if (char === ROBOT) {
        this._robot = new Coordinate(row, column);
      }
      return char as MapObject | Arrow;
    });

    this._moves = parts[1]
      .split('')
      .filter((c) => c !== '\n')
      .map<Arrow>((c) => c as Arrow);
  }

  go = (): void => {
    for (const move of this._moves) {
      console.log(move);
      this.tryMoveRobot(move);
      this.print();
    }
  };

  tryMoveRobot = (arrow: Arrow): void => {
    const direction = directionMap[arrow];
    let next = this._robot.move(direction);
    let nextValue = this._warehouse.atCoordinate(next);
    if (nextValue === WALL) {
      return;
    }

    if (nextValue === EMPTY) {
      this._warehouse.setCoordinate(this._robot, EMPTY);
      this._robot = next;
      this._warehouse.setCoordinate(this._robot, ROBOT);
      return;
    }

    if (nextValue === BOX) {
      let numBoxesInARow = 1;
      let hasEmptySpace = false;
      while (true) {
        next = next.move(direction);
        nextValue = this._warehouse.atCoordinate(next);
        if (nextValue === BOX) {
          numBoxesInARow++;
        } else if (nextValue === EMPTY) {
          hasEmptySpace = true;
          break;
        } else {
          // WALL
          break;
        }
      }

      if (hasEmptySpace) {
        // Fill empty space with block
        this._warehouse.setCoordinate(next, BOX);

        // Replace first block with robot
        this._warehouse.setCoordinate(this._robot, EMPTY);
        this._robot = this._robot.move(direction);
        this._warehouse.setCoordinate(this._robot, ROBOT);
      }
    }
  };

  getGpsCoordsOfBoxes = (): Array<number> => {
    const gpsCoords: Array<number> = [];
    this._warehouse.forEach((item, row, column) => {
      if (item === BOX) {
        gpsCoords.push(100 * row + column);
      }
    });

    return gpsCoords;
  };

  print = (): void => {
    console.log(this._warehouse.toString() + '\n');
  };
}

export const getPartTwoSolution = (input: string): string => {
  return '';
};
