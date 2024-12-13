import { cardinalDirections, Coordinate } from '../coordinate';
import { StringSet } from '../stringSet';
import { TwoDimensionalArray } from '../twoDimensionalArray';

export const getPartOneSolution = (input: string): string => {
  const matrix = new TwoDimensionalArray(input, (char) => char);
  const visited = new StringSet<Coordinate>();
  const regions = new Map<string, StringSet<Coordinate>>();
  matrix.forEach((item, row, column) => {
    const c = new Coordinate(row, column);
    if (visited.has(c)) {
      return;
    }

    const key = `${item} @ ${c}`;
    const region = new StringSet<Coordinate>(new Set([c]));
    getRegionFor(c, matrix, visited, region);
    regions.set(key, region);
  });

  let totalPrice = 0;
  for (const region of regions.values()) {
    const area = region.size;
    const perimeter = getPerimeterFor(region);
    totalPrice += area * perimeter;
  }

  return totalPrice.toString();
};

const getPerimeterFor = (region: StringSet<Coordinate>): number => {
  let perimeter = 0;
  for (const coord of region) {
    for (const direction of cardinalDirections) {
      const next = coord.move(direction);
      if (!region.has(next)) {
        perimeter++;
      }
    }
  }

  return perimeter;
};

const getRegionFor = (
  coord: Coordinate,
  matrix: TwoDimensionalArray<string>,
  visited: StringSet<Coordinate>,
  region: StringSet<Coordinate>
): void => {
  const name = matrix.atCoordinate(coord);
  if (name === undefined || visited.has(coord)) {
    return;
  }

  visited.add(coord);

  for (const direction of cardinalDirections) {
    const next = coord.move(direction);
    if (visited.has(next)) {
      continue;
    }

    if (matrix.atCoordinate(next) === name) {
      region.add(next);
      getRegionFor(next, matrix, visited, region);
    }
  }
};

export const getPartTwoSolution = (input: string): string => {
  return '';
};
