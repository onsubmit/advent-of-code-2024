import { forEach2dArray } from '../arrayMethods';
import { Coordinate } from '../coordinate';
import { inputTo2dArray } from '../inputHelper';
import { StringSet } from '../stringSet';

export const getPartOneSolution = (input: string): string => {
  const signals: Map<string, StringSet<Coordinate>> = new Map();
  const antinodeCoordinates = new StringSet<Coordinate>();
  const positions = inputTo2dArray(input, '', (char) => char);

  forEach2dArray(positions, (char, row, column) => {
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
          (c) => positions[c.row]?.[c.column] !== undefined
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
  const positions = inputTo2dArray(input, '', (char) => char);

  forEach2dArray(positions, (char, row, column) => {
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
        while (positions[c.row]?.[c.column] !== undefined) {
          antinodeCoordinates.add(c);
          c = c.plus(distance);
        }

        c = b;
        while (positions[c.row]?.[c.column] !== undefined) {
          antinodeCoordinates.add(c);
          c = c.minus(distance);
        }
      }
    }
  }

  return antinodeCoordinates.size.toString();
};
