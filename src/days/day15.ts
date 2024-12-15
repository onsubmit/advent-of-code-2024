import { sumArray } from '../arrayMethods';
import { CardinalDirection, Coordinate } from '../coordinate';
import { StringSet } from '../stringSet';
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
const BOX_LEFT = '[';
const BOX_RIGHT = ']';
const ROBOT = '@';

const UP = '^';
const DOWN = 'v';
const LEFT = '<';
const RIGHT = '>';

type MapObject = '#' | '.' | 'O' | '@' | '[' | ']';
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
      this.tryMoveRobot(move);
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
  const warehouse = new WarehousePart2(input);
  warehouse.go();
  const gpsCoords = warehouse.getGpsCoordsOfBoxes();
  return sumArray(gpsCoords).toString();
};

class WarehousePart2 {
  private _warehouse: TwoDimensionalArray<MapObject | Arrow>;
  private _moves: Array<Arrow>;
  private _robot: Coordinate = new Coordinate(-1, -1);

  constructor(input: string) {
    const parts = input.split('\n\n');

    const map: Array<string> = [];
    const mapLines = parts[0].split('\n');
    for (let i = 0; i < mapLines.length; i++) {
      let newLine = mapLines[i];
      newLine = newLine.replaceAll('#', '##');
      newLine = newLine.replaceAll('O', '[]');
      newLine = newLine.replaceAll('.', '..');
      newLine = newLine.replaceAll('@', '@.');
      map.push(newLine);
    }

    this._warehouse = new TwoDimensionalArray<MapObject | Arrow>(
      map.join('\n'),
      (char, row, column) => {
        if (char === ROBOT) {
          this._robot = new Coordinate(row, column);
        }
        return char as MapObject | Arrow;
      }
    );

    this._moves = parts[1]
      .split('')
      .filter((c) => c !== '\n')
      .map<Arrow>((c) => c as Arrow);
  }

  go = (): void => {
    for (const move of this._moves) {
      this.tryMoveRobot(move);
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

    if (nextValue === BOX_LEFT || nextValue === BOX_RIGHT) {
      if (direction === 'W' || direction === 'E') {
        let numBoxesInARow = 1;
        let hasEmptySpace = false;
        while (true) {
          next = next.move(direction).move(direction);
          nextValue = this._warehouse.atCoordinate(next);
          if (nextValue === BOX_LEFT || nextValue === BOX_RIGHT) {
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
          while (!next.equals(this._robot)) {
            this._warehouse.setCoordinate(
              next,
              this._warehouse.atCoordinate((next = next.move(direction === 'E' ? 'W' : 'E')))!
            );
          }

          this._warehouse.setCoordinate(next, EMPTY);
          this._robot = next.move(direction);
          this._warehouse.setCoordinate(this._robot, ROBOT);
        }
      } else {
        // direction is up or down
        const coordsOfConnectedBoxes = [
          ...new StringSet<Coordinate>(new Set(this.getConnectedBoxes(this._robot, direction))),
        ];

        let canConnectedBoxesMove = true;
        for (const box of coordsOfConnectedBoxes) {
          const next = box.move(direction);
          const nextValue = this._warehouse.atCoordinate(next);
          if (nextValue === WALL) {
            canConnectedBoxesMove = false;
            break;
          }
        }

        if (canConnectedBoxesMove) {
          coordsOfConnectedBoxes.sort((a, b) =>
            direction === 'N' ? a.row - b.row : b.row - a.row
          );

          for (const box of coordsOfConnectedBoxes) {
            const boxValue = this._warehouse.atCoordinate(box)!;
            this._warehouse.setCoordinate(box.move(direction), boxValue);
            this._warehouse.setCoordinate(box, EMPTY);
          }

          this._warehouse.setCoordinate(this._robot, EMPTY);
          this._robot = this._robot.move(direction);
          this._warehouse.setCoordinate(this._robot, ROBOT);
        }
      }
    }
  };

  getConnectedBoxes = (c: Coordinate, direction: CardinalDirection): Array<Coordinate> => {
    let coordsOfConnectedBoxes: Array<Coordinate> = [];
    const next = c.move(direction);
    const aboveValue = this._warehouse.atCoordinate(next);
    if (aboveValue === BOX_LEFT) {
      coordsOfConnectedBoxes.push(next);
      coordsOfConnectedBoxes.push(next.move('E'));

      coordsOfConnectedBoxes = coordsOfConnectedBoxes
        .concat(this.getConnectedBoxes(next, direction))
        .concat(this.getConnectedBoxes(next.move('E'), direction));
    } else if (aboveValue === BOX_RIGHT) {
      coordsOfConnectedBoxes.push(next.move('W'));
      coordsOfConnectedBoxes.push(next);

      coordsOfConnectedBoxes = coordsOfConnectedBoxes
        .concat(this.getConnectedBoxes(next.move('W'), direction))
        .concat(this.getConnectedBoxes(next, direction));
    }

    return coordsOfConnectedBoxes;
  };

  getGpsCoordsOfBoxes = (): Array<number> => {
    const gpsCoords: Array<number> = [];
    this._warehouse.forEach((item, row, column) => {
      if (item === BOX_LEFT) {
        gpsCoords.push(100 * row + column);
      }
    });

    return gpsCoords;
  };

  print = (): void => {
    console.log(this._warehouse.toString() + '\n');
  };
}
