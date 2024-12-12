type Stone = {
  value: number;
  next: Stone | undefined;
};

export const getPartOneSolution = (input: string): string => {
  const list = input.split(' ');
  const root: Stone = {
    value: parseInt(list[0], 10),
    next: undefined,
  };

  let current: Stone | undefined = root;
  for (let i = 1; i < list.length; i++) {
    current = current.next = {
      value: parseInt(list[i], 10),
      next: undefined,
    };
  }

  for (let blink = 0; blink < 25; blink++) {
    current = root;
    while (current) {
      if (current.value === 0) {
        current.value = 1;
        current = current.next;
      } else {
        const str = current.value.toString();
        if (str.length % 2 === 0) {
          const right: Stone = {
            value: parseInt(str.substring(str.length / 2, str.length), 10),
            next: current.next,
          };
          current.value = parseInt(str.substring(0, str.length / 2), 10);
          current.next = right;
          current = right.next;
        } else {
          current.value *= 2024;
          current = current.next;
        }
      }
    }
  }

  return getNumStones(root).toString();
};

const getNumStones = (root: Stone): number => {
  let count = 0;
  let current: Stone | undefined = root;
  while (current) {
    count++;
    current = current.next;
  }

  return count;
};

export const getPartTwoSolution = (input: string): string => {
  const stones = input.split(' ').map(Number);
  const cache: Map<string, number> = new Map();

  let blinked = 0;
  for (const stone of stones) {
    blinked += blinkStone(stone, 75, cache);
  }

  return blinked.toString();
};

const blinkStone = (stone: number, times: number, cache: Map<string, number>): number => {
  if (times === 0) {
    return 1;
  }

  const key = `${stone},${times}`;
  const cached = cache.get(key);
  if (cached) {
    return cached;
  }

  let blinked = 0;
  if (stone === 0) {
    blinked = blinkStone(1, times - 1, cache);
  } else {
    const str = stone.toString();
    if (str.length % 2 === 0) {
      blinked =
        blinkStone(parseInt(str.substring(0, str.length / 2), 10), times - 1, cache) +
        blinkStone(parseInt(str.substring(str.length / 2, str.length), 10), times - 1, cache);
    } else {
      blinked = blinkStone(stone * 2024, times - 1, cache);
    }
  }

  cache.set(key, blinked);
  return blinked;
};
