import { sumArrayBy } from '../arrayMethods';

export const getPartOneSolution = (input: string): string => {
  const lines = input.split('\n').reverse();

  const pageOrderingRules: Map<number, Set<number>> = new Map();
  let line: string | undefined;
  while ((line = lines.pop())) {
    const split = line.split('|');
    const a = parseInt(split[0], 10);
    const b = parseInt(split[1], 10);
    if (pageOrderingRules.has(a)) {
      pageOrderingRules.get(a)?.add(b);
    } else {
      pageOrderingRules.set(a, new Set([b]));
    }
  }

  const updates: Array<Array<number>> = [];
  while ((line = lines.pop())) {
    updates.push(line.split(',').map((v) => parseInt(v, 10)));
  }

  const correctUpdates = updates.filter((u) => isUpdateCorrect(u, pageOrderingRules));
  return sumArrayBy(correctUpdates, (update) => update[Math.floor(update.length / 2)]).toString();
};

const isUpdateCorrect = (
  update: Array<number>,
  pageOrderingRules: Map<number, Set<number>>
): boolean => {
  for (let i = 0; i < update.length; i++) {
    for (let j = 0; j < i; j++) {
      if (!pageOrderingRules.get(update[j])?.has(update[i])) {
        return false;
      }
    }

    for (let j = i + 1; j < update.length; j++) {
      if (!pageOrderingRules.get(update[i])?.has(update[j])) {
        return false;
      }
    }
  }

  return true;
};

export const getPartTwoSolution = (input: string): string => {
  return '';
};
