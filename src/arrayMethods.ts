export const sumArray = (arr: number[]) => arr.reduce((acc, a) => acc + a, 0);

export const multiplyArray = (arr: number[]) => arr.reduce((acc, a) => acc * a, 1);

export const sortArray = (arr: number[]) => arr.sort((a, b) => a - b);
