import { sumArrayBy } from '../arrayMethods';

export const getPartOneSolution = (input: string): string => {
  const lines = input.split('\n').filter(Boolean);
  const line = lines.join('');

  const sum = getSumOfProducts(line);
  return sum.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const lines = input.split('\n').filter(Boolean);
  const line = lines.join('');

  const split: Array<string> = [];
  let index1 = 0;
  let index2 = 0;
  let count = 0;
  const delimiters = ["don't()", 'do()'] as const;
  let delim: string = '';
  while (((delim = delimiters[count++ % 2]), (index2 = line.indexOf(delim, index1)) > -1)) {
    split.push(line.substring(index1, index2));
    index1 = index2 + delim.length;
  }

  split.push(line.substring(index1));

  const sum = sumArrayBy(split, (line, i) => (i % 2 ? 0 : getSumOfProducts(line)));
  return sum.toString();
};

const getSumOfProducts = (line: string): number => {
  let sum = 0;
  const matches = line.matchAll(/mul\((\d+),(\d+)\)/g);
  for (const match of matches) {
    const a = parseInt(match[1], 10);
    const b = parseInt(match[2], 10);
    sum += a * b;
  }

  return sum;
};
