import { countArrayBy } from '../arrayMethods';
import { inputTo2dArray } from '../inputHelper';

export const getPartOneSolution = (input: string): string => {
  const array = inputTo2dArray(input, ' ', (char) => parseInt(char, 10));
  return countArrayBy(array, isLineSafePartOne).toString();
};

const isLineSafePartOne = (line: Array<number>): boolean => {
  if (line[0] === line[1]) {
    return false;
  }

  const isDecreasing = line[0] - line[1] > 0;
  for (let i = 0; i < line.length - 1; i++) {
    const delta = isDecreasing ? line[i] - line[i + 1] : line[i + 1] - line[i];

    if (delta <= 0 || delta > 3) {
      return false;
    }
  }

  return true;
};

export const getPartTwoSolution = (input: string): string => {
  const array = inputTo2dArray(input, ' ', (char) => parseInt(char, 10));
  return countArrayBy(array, isLineSafePartTwo).toString();
};

const isLineSafePartTwo = (line: Array<number>): boolean => {
  if (isLineSafePartOne(line)) {
    return true;
  }

  for (let i = 0; i < line.length; i++) {
    const temp = [...line];
    temp.splice(i, 1);
    if (isLineSafePartOne(temp)) {
      return true;
    }
  }

  return false;
};
