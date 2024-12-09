import { Coordinate } from '../coordinate';
import { StringSet } from '../stringSet';
import { TwoDimensionalArray } from '../twoDimensionalArray';

export const getPartOneSolution = (input: string): string => {
  const signals: Map<string, StringSet<Coordinate>> = new Map();
  const antinodeCoordinates = new StringSet<Coordinate>();
  const positions = new TwoDimensionalArray(input, (c) => c);

  positions.forEach((char, row, column) => {
    if (char !== '.') {
      if (!signals.has(char)) {
        signals.set(char, new StringSet());
      }

      signals.get(char)!.add(new Coordinate(row, column));
    }
  });

  for (const coordinates of signals.values()) {
    for (const a of coordinates) {
      for (const b of coordinates) {
        if (a === b) {
          continue;
        }

        const distance = a.minus(b);
        const antinodes = [a.plus(distance), b.minus(distance)].filter(
          (c) => positions.atCoordinate(c) !== undefined
        );
        for (const antinode of antinodes) {
          antinodeCoordinates.add(antinode);
        }
      }
    }
  }

  return antinodeCoordinates.size.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const signals: Map<string, StringSet<Coordinate>> = new Map();
  const antinodeCoordinates = new StringSet<Coordinate>();
  const positions = new TwoDimensionalArray(input, (c) => c);

  positions.forEach((char, row, column) => {
    if (char !== '.') {
      if (!signals.has(char)) {
        signals.set(char, new StringSet());
      }

      signals.get(char)!.add(new Coordinate(row, column));
    }
  });

  for (const coordinates of signals.values()) {
    for (const a of coordinates) {
      for (const b of coordinates) {
        if (a === b) {
          continue;
        }

        const distance = a.minus(b);

        let c = a;
        while (positions.atCoordinate(c) !== undefined) {
          antinodeCoordinates.add(c);
          c = c.plus(distance);
        }

        c = b;
        while (positions.atCoordinate(c) !== undefined) {
          antinodeCoordinates.add(c);
          c = c.minus(distance);
        }
      }
    }
  }

  return antinodeCoordinates.size.toString();
};
