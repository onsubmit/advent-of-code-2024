import { sumArrayBy } from '../arrayMethods';

export const getPartOneSolution = (input: string): string => {
  let blocks: Array<number> = [];
  const dotIndices: Array<number> = [];
  [...input].forEach((char, i) => {
    const repeat = parseInt(char, 10);
    if (i % 2 === 0) {
      blocks = blocks.concat(Array(repeat).fill(i / 2));
    } else {
      blocks = blocks.concat(Array(repeat).fill(-1));
      for (let i = blocks.length - repeat; i < blocks.length; i++) {
        dotIndices.push(i);
      }
    }
  });

  dotIndices.reverse();

  const arranged = [...blocks];
  let right: number | undefined;
  while ((right = blocks.pop()) !== undefined) {
    if (right === -1) {
      continue;
    }

    const index = dotIndices.pop();
    if (index === undefined) {
      break;
    }

    arranged[index] = right;
    blocks[index] = right;
  }

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === undefined) {
      arranged.length = i + 1;
      break;
    }
  }

  const sum = sumArrayBy(arranged, (v, i) => i * v);
  return sum.toString();
};

export const getPartTwoSolution = (input: string): string => {
  return '';
};
