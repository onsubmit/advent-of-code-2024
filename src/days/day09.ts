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

type Block = {
  fileId: number;
  length: number;
  moved: boolean;
};

export const getPartTwoSolution = (input: string): string => {
  const blocks: Array<Block> = [];
  [...input].forEach((char, i) => {
    const repeat = parseInt(char, 10);
    if (repeat === 0) {
      return;
    }
    if (i % 2 === 0) {
      blocks.push({ fileId: i / 2, length: repeat, moved: false });
    } else {
      blocks.push({ fileId: -1, length: repeat, moved: false });
    }
  });

  for (let i = blocks.length - 1; i >= 0; i--) {
    const right = blocks[i];
    if (right.fileId < 0 || right.moved) {
      continue;
    }

    const index = blocks.findIndex((v) => v.fileId === -1 && v.length >= right.length);
    if (index >= 0 && index < i) {
      const diff = blocks[index].length - right.length;
      if (diff === 0) {
        right.moved = true;
        blocks[index].fileId = right.fileId;
        blocks[i].fileId = -2;
        i = blocks.length;
        continue;
      } else if (diff > 0) {
        right.moved = true;
        blocks[index].fileId = right.fileId;
        blocks[index].length = right.length;
        blocks[i].fileId = -2;
        blocks.splice(index + 1, 0, { fileId: -1, length: diff, moved: false });
        i = blocks.length;
        continue;
      }
    }
  }

  let position = 0;
  const sum = sumArrayBy(blocks, (v, i) => {
    if (v.fileId < 0) {
      position += v.length - 1;
      return 0;
    }

    let s = 0;
    for (let j = 0; j < v.length; j++) {
      s += (i + position++) * v.fileId;
    }

    position--;

    return s;
  });

  return sum.toString();
};
