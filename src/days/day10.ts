import { cardinalDirections, Coordinate } from '../coordinate';
import { StringMap } from '../stringMap';
import { TwoDimensionalArray } from '../twoDimensionalArray';

export const getPartOneSolution = (input: string): string => {
  return getNumPaths(input, false).toString();
};

export const getPartTwoSolution = (input: string): string => {
  return getNumPaths(input, true).toString();
};

const getNumPaths = (input: string, distinct: boolean): number => {
  const graph = new Graph();

  const matrix = new TwoDimensionalArray(input, Number);
  const starts: Array<Coordinate> = [];
  const ends: Array<Coordinate> = [];
  matrix.forEach((num, row, column) => {
    const c = new Coordinate(row, column);
    if (num === 0) {
      starts.push(c);
    } else if (num === 9) {
      ends.push(c);
    }

    const neighbors = getValidNeighbors(c);
    for (const neighbor of neighbors) {
      graph.addEdge(c, neighbor);
    }
  });

  function getValidNeighbors(c: Coordinate): Array<Coordinate> {
    const neighbors: Array<Coordinate> = [];
    const value = matrix.atCoordinate(c)!;

    for (const direction of cardinalDirections) {
      const next = c.move(direction);
      if (matrix.atCoordinate(next) === value + 1) {
        neighbors.push(next);
      }
    }

    return neighbors;
  }

  let paths: Array<Array<Coordinate>> = [];
  for (const start of starts) {
    for (const end of ends) {
      const newPaths = graph.findPaths(start, end, distinct);
      paths = [...paths, ...newPaths];
    }
  }

  return paths.length;
};

class Graph {
  private _adjacent: StringMap<Coordinate, Array<Coordinate>>;

  constructor() {
    this._adjacent = new StringMap();
  }

  addEdge = (value: Coordinate, adjacent: Coordinate): void => {
    if (this._adjacent.has(value)) {
      this._adjacent.get(value)!.push(adjacent);
    } else {
      this._adjacent.set(value, [adjacent]);
    }
  };

  findPaths = (start: Coordinate, end: Coordinate, distinct = false): Array<Array<Coordinate>> => {
    const paths: Array<Array<Coordinate>> = [];
    const queue: Array<Array<Coordinate>> = [];

    let path: Array<Coordinate> | undefined = [start];
    queue.push(path.slice());

    while (queue.length) {
      path = queue.shift()!;

      const last = path.at(-1)!;
      if (last.equals(end)) {
        paths.push(path);
        if (!distinct) {
          break;
        }
      }

      const lastAdjacent = this._adjacent.get(last);
      if (!lastAdjacent) {
        continue;
      }

      for (let i = 0; i < lastAdjacent.length; i++) {
        if (!path.find((p) => p.equals(lastAdjacent[i]))) {
          const newPath = path.slice();
          newPath.push(lastAdjacent[i]);
          queue.push(newPath);
        }
      }
    }

    return paths;
  };
}
