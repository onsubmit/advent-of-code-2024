import { sumArrayBy } from '../arrayMethods';

type Line = {
  value: number;
  equation: Array<number>;
};

type Operator = '+' | '*' | '||';

export const getPartOneSolution = (input: string): string => {
  const lines = getLines(input);
  const operators = new Set<Operator>(['+', '*']);
  const possiblyTrueEquations = lines.filter((line) => isPossiblyTrue(line, operators));
  const totalCalibrationResult = sumArrayBy(possiblyTrueEquations, (equation) => equation.value);
  return totalCalibrationResult.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const lines = getLines(input);
  const operators = new Set<Operator>(['+', '*', '||']);
  const possiblyTrueEquations = lines.filter((line) => isPossiblyTrue(line, operators));
  const totalCalibrationResult = sumArrayBy(possiblyTrueEquations, (equation) => equation.value);
  return totalCalibrationResult.toString();
};

const getLines = (input: string): Array<Line> => {
  return input.split('\n').map((line) => {
    const split = line.split(':').map((v) => v.trim());
    const value = parseInt(split[0], 10);
    const equation = split[1].split(' ').map((v) => parseInt(v, 10));
    return {
      value,
      equation,
    };
  });
};

const isPossiblyTrue = (line: Line, operators: Set<Operator>): boolean => {
  const permutations = generatePermutationsOfLength([...operators], line.equation.length - 1);
  const expected = line.value;
  for (const operators of permutations) {
    let actual = line.equation[0];
    for (let i = 1; i < line.equation.length; i++) {
      switch (operators[i - 1]) {
        case '+': {
          actual += line.equation[i];
          break;
        }
        case '*': {
          actual *= line.equation[i];
          break;
        }
        case '||': {
          actual = parseInt(`${actual}${line.equation[i]}`, 10);
        }
      }
    }

    if (actual === expected) {
      return true;
    }
  }

  return false;
};

const generatePermutationsOfLength = <T>(array: Array<T>, length: number): Array<Array<T>> => {
  const permutations: Array<Array<T>> = [];
  for (let i = 0; i < Math.pow(array.length, length); i++) {
    const permutation = getPermutationAt(i, array, length);
    permutations.push(permutation);
  }

  return permutations;
};

const getPermutationAt = <T>(index: number, array: Array<T>, length: number): Array<T> => {
  const permutation: Array<T> = [];
  for (let i = 0; i < length; i++) {
    permutation.push(array[index % array.length]);
    index = Math.floor(index / array.length);
  }
  return permutation;
};
