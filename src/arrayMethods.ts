export const sumArray = (arr: number[]) => arr.reduce((acc, a) => acc + a, 0);

export const multiplyArray = (arr: number[]) => arr.reduce((acc, a) => acc * a, 1);

export const sortArray = (arr: number[]) => arr.sort((a, b) => a - b);

export const countWhere = <T>(arr: T[], fn: (v: T) => boolean): number => {
  let count = 0;
  for (const row of arr) {
    if (fn(row)) {
      count++;
    }
  }

  return count;
};
