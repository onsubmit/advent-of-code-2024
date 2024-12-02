import { sortArray, sumArrayBy } from '../arrayMethods';

export const getPartOneSolution = (input: string): string => {
  const { left, right } = parseInput(input);
  return sumArrayBy(left, (l, i) => Math.abs(l - right[i])).toString();
};

export const getPartTwoSolution = (input: string): string => {
  const { left, right } = parseInput(input);
  return sumArrayBy(left, (l) => l * right.filter((r) => r === l).length).toString();
};

const parseInput = (input: string): { left: Array<number>; right: Array<number> } => {
  const lines = input.split('\n').filter(Boolean);

  const left: Array<number> = [];
  const right: Array<number> = [];
  for (const line of lines) {
    const split = line.split(' ').filter(Boolean);
    left.push(parseInt(split[0], 10));
    right.push(parseInt(split[1], 10));
  }

  return { left: sortArray(left), right: sortArray(right) };
};
