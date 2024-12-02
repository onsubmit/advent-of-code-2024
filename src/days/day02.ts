export const getPartOneSolution = (input: string): string => {
  const lines = input.split('\n').filter(Boolean);
  const array: Array<Array<number>> = [];
  for (const line of lines) {
    array.push(line.split(' ').map((v) => parseInt(v, 10)));
  }

  let safeLines = 0;
  for (let r = 0; r < array.length; r++) {
    if (isLineSafe(array[r])) {
      safeLines++;
    }
  }

  return safeLines.toString();
};

const isLineSafe = (line: Array<number>): boolean => {
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
  const lines = input.split('\n').filter(Boolean);
  const array: Array<Array<number>> = [];
  for (const line of lines) {
    array.push(line.split(' ').map((v) => parseInt(v, 10)));
  }

  let safeLines = 0;
  for (let r = 0; r < array.length; r++) {
    if (isLineSafePart2(array[r])) {
      safeLines++;
    }
  }

  return safeLines.toString();
};

const isLineSafePart2 = (line: Array<number>): boolean => {
  if (isLineSafe(line)) {
    return true;
  }

  for (let i = 0; i < line.length; i++) {
    const temp = [...line];
    temp.splice(i, 1);
    if (isLineSafe(temp)) {
      return true;
    }
  }

  return false;
};
