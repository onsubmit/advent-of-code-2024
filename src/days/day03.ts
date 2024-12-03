export const getPartOneSolution = (input: string): string => {
  const lines = input.split('\n').filter(Boolean);
  const line = lines.join('');

  const matches = line.matchAll(/mul\((\d+),(\d+)\)/g);
  let sum = 0;
  for (const match of matches) {
    const a = parseInt(match[1], 10);
    const b = parseInt(match[2], 10);
    sum += a * b;
  }
  return sum.toString();
};

export const getPartTwoSolution = (input: string): string => {
  return '';
};
