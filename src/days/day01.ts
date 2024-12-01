export const getPartOneSolution = (input: string): string => {
  const lines = input.split('\n').filter(Boolean);

  let left: Array<number> = [];
  let right: Array<number> = [];
  for (const line of lines) {
    const split = line.split(' ').filter(Boolean);
    left.push(parseInt(split[0], 10));
    right.push(parseInt(split[1], 10));
  }

  left = left.sort();
  right = right.sort();

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const lines = input.split('\n').filter(Boolean);

  let left: Array<number> = [];
  let right: Array<number> = [];
  for (const line of lines) {
    const split = line.split(' ').filter(Boolean);
    left.push(parseInt(split[0], 10));
    right.push(parseInt(split[1], 10));
  }

  left = left.sort();
  right = right.sort();

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    const l = left[i];
    const found = right.filter((r) => r === l).length;
    sum += l * found;
  }

  return sum.toString();
};
