import { CardinalDirection, cardinalDirections, Coordinate } from '../coordinate';
import { StringMap } from '../stringMap';
import { TwoDimensionalArray } from '../twoDimensionalArray';

export const getPartOneSolution = (input: string): string => {
  let guard = new Coordinate(-1, -1);
  const map = new TwoDimensionalArray(input, (char, r, c) => {
    if (char === '^') {
      guard.row = r;
      guard.column = c;
    }

    return char;
  });

  let directionIndex = 0;
  let pathLength = 0;
  while (map.atCoordinate(guard) !== undefined) {
    map.setCoordinate(guard, 'X');
    let direction = cardinalDirections[directionIndex % cardinalDirections.length];
    let next = guard.move(direction);
    if (map.atCoordinate(guard) === undefined) {
      break;
    }

    while (map.atCoordinate(next) === '#') {
      direction = cardinalDirections[++directionIndex % cardinalDirections.length];
      next = guard.move(direction);
    }

    guard = next;
    if (map.atCoordinate(guard) !== 'X') {
      pathLength++;
    }
  }
  return pathLength.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const originalGuard = new Coordinate(-1, -1);
  const map = new TwoDimensionalArray(input, (char, r, c) => {
    if (char === '^') {
      originalGuard.row = r;
      originalGuard.column = c;
    }

    return char;
  });

  let loops = 0;
  map.forEach((item, r, c) => {
    const m = map.clone();
    if (item !== '.') {
      return;
    }

    m.set(r, c, '#');

    let guard = originalGuard.clone();
    const path = new StringMap<Coordinate, CardinalDirection>();
    path.set(guard, 'N');

    let directionIndex = 0;
    while (m.atCoordinate(guard) !== undefined) {
      let direction = cardinalDirections[directionIndex % cardinalDirections.length];
      let next = guard.move(direction);
      if (m.atCoordinate(next) === undefined) {
        break;
      }

      while (m.atCoordinate(next) === '#') {
        direction = cardinalDirections[++directionIndex % cardinalDirections.length];
        next = guard.move(direction);
      }

      guard = next;
      if (path.get(guard) === direction) {
        loops++;
        break;
      }

      path.set(guard, direction);
      m.setCoordinate(guard, 'X');
    }
  });

  return loops.toString();
};
