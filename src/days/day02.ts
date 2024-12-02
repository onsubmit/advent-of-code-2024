export const getPartOneSolution = (input: string): string => {
  const array = parseInput(input);
  const safeLines = array.filter((line) => isLineSafePartOne(line)).length;
  return safeLines.toString();
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
  const array = parseInput(input);
  const safeLines = array.filter((line) => isLineSafePartTwo(line)).length;
  return safeLines.toString();
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

const parseInput = (input: string): Array<Array<number>> => {
  const lines = input.split('\n').filter(Boolean);
  const array: Array<Array<number>> = [];
  for (const line of lines) {
    array.push(line.split(' ').map((v) => parseInt(v, 10)));
  }

  return array;
};
