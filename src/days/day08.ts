import { add, Coordinate, getDistance, invert } from '../coordinate';
import { inputTo2dArray } from '../inputHelper';

type Position = {
  signal: string;
  hasAntinode: boolean;
};

export const getPartOneSolution = (input: string): string => {
  const signals: Map<string, Array<Coordinate>> = new Map();
  const positions: Array<Array<Position>> = inputTo2dArray(input, '', (char, row, column) => {
    if (char !== '.') {
      if (signals.has(char)) {
        signals.get(char)!.push({ row, column });
      } else {
        signals.set(char, [{ row, column }]);
      }
    }

    return {
      signal: char,
      hasAntinode: false,
    };
  });

  function isValidCoordinate(c: Coordinate): boolean {
    if (c.row < 0 || c.column < 0) {
      return false;
    }

    if (c.row >= positions.length || c.column >= positions[c.row].length) {
      return false;
    }

    return true;
  }

  let numAntinodes = 0;
  for (const coordinates of signals.values()) {
    for (const a of coordinates) {
      for (const b of coordinates) {
        if (a === b) {
          continue;
        }

        const distance = getDistance(a, b);
        const antinodes = [add(a, distance), add(b, invert(distance))].filter(isValidCoordinate);
        for (const antinode of antinodes) {
          const { hasAntinode } = positions[antinode.row][antinode.column];
          if (!hasAntinode) {
            numAntinodes++;
          }
          positions[antinode.row][antinode.column].hasAntinode = true;
        }
      }
    }
  }

  return numAntinodes.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const signals: Map<string, Array<Coordinate>> = new Map();
  const positions: Array<Array<Position>> = inputTo2dArray(input, '', (char, row, column) => {
    if (char !== '.' && char !== '#') {
      if (signals.has(char)) {
        signals.get(char)!.push({ row, column });
      } else {
        signals.set(char, [{ row, column }]);
      }
    }

    return {
      signal: char,
      hasAntinode: false,
    };
  });

  function isValidCoordinate(c: Coordinate): boolean {
    if (c.row < 0 || c.column < 0) {
      return false;
    }

    if (c.row >= positions.length || c.column >= positions[c.row].length) {
      return false;
    }

    return true;
  }

  let numAntinodes = 0;
  for (const coordinates of signals.values()) {
    for (const a of coordinates) {
      const { hasAntinode } = positions[a.row][a.column];
      if (!hasAntinode) {
        numAntinodes++;
      }
      positions[a.row][a.column].hasAntinode = true;

      for (const b of coordinates) {
        if (a === b) {
          continue;
        }

        const distance = getDistance(a, b);

        let c = a;
        while (true) {
          c = add(c, distance);
          if (!isValidCoordinate(c)) {
            break;
          }

          const { hasAntinode } = positions[c.row][c.column];
          if (!hasAntinode) {
            numAntinodes++;
          }
          positions[c.row][c.column].hasAntinode = true;
        }

        c = b;
        while (true) {
          c = add(c, invert(distance));
          if (!isValidCoordinate(c)) {
            break;
          }

          const { hasAntinode } = positions[c.row][c.column];
          if (!hasAntinode) {
            numAntinodes++;
          }
          positions[c.row][c.column].hasAntinode = true;
        }
      }
    }
  }

  return numAntinodes.toString();
};
