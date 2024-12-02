export const sumArray = (arr: number[]) => arr.reduce((acc, a) => acc + a, 0);
export const sumArrayBy = <T>(arr: T[], fn: (v: T, i: number) => number): number =>
  arr.reduce((acc, v, i) => (acc += fn(v, i)), 0);

export const multiplyArray = (arr: number[]) => arr.reduce((acc, a) => acc * a, 1);

export const sortArray = (arr: number[]) => arr.sort((a, b) => a - b);

export const countArrayBy = <T>(arr: T[], fn: (v: T, i: number) => boolean): number =>
  arr.reduce((acc, a, i) => (fn(a, i) ? acc + 1 : acc), 0);
