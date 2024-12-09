import { Coordinate, directions } from '../coordinate';
import { TwoDimensionalArray } from '../twoDimensionalArray';

export const getPartOneSolution = (input: string): string => {
  const matrix = new TwoDimensionalArray(input, (c) => c);

  let sum = 0;
  matrix.forEach((_item, r, c) => {
    const found = findXmasAt(matrix, new Coordinate(r, c));
    sum += found;
  });

  return sum.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const matrix = new TwoDimensionalArray(input, (c) => c);

  let sum = 0;
  matrix.forEach((_item, r, c) => {
    const found = findMasInXShapeAt(matrix, new Coordinate(r, c));
    sum += found;
  });

  return sum.toString();
};

const findXmasAt = (matrix: TwoDimensionalArray<string>, coordinate: Coordinate): number => {
  if (matrix.atCoordinate(coordinate) !== 'X') {
    return 0;
  }

  let found = 0;
  for (const direction of directions) {
    let c = coordinate.clone();
    let broke = false;
    for (const next of ['M', 'A', 'S'] as const) {
      c = c.move(direction);
      if (matrix.atCoordinate(c) !== next) {
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

const findMasInXShapeAt = (matrix: TwoDimensionalArray<string>, coordinate: Coordinate): number => {
  if (matrix.atCoordinate(coordinate) !== 'A') {
    return 0;
  }

  const nw = coordinate.move('NW');
  const ne = coordinate.move('NE');
  const sw = coordinate.move('SW');
  const se = coordinate.move('SE');

  const line1 = [matrix.atCoordinate(nw), matrix.atCoordinate(se)];
  const line2 = [matrix.atCoordinate(ne), matrix.atCoordinate(sw)];
  line1.sort();
  line2.sort();

  if (line1.join('') === 'MS' && line2.join('') === 'MS') {
    return 1;
  }

  return 0;
};
