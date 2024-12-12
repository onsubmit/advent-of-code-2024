export const getPartOneSolution = (input: string): string => {
  return blink(25, input).toString();
};

export const getPartTwoSolution = (input: string): string => {
  return blink(75, input).toString();
};

const blink = (numBlinks: number, input: string): number => {
  const stones = input.split(' ').map(Number);
  const cache: Map<string, number> = new Map();

  let blinked = 0;
  for (const stone of stones) {
    blinked += blinkStone(stone, numBlinks, cache);
  }

  return blinked;
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
      const middle = str.length / 2;
      blinked =
        blinkStone(parseInt(str.substring(0, middle), 10), times - 1, cache) +
        blinkStone(parseInt(str.substring(middle, str.length), 10), times - 1, cache);
    } else {
      blinked = blinkStone(stone * 2024, times - 1, cache);
    }
  }

  cache.set(key, blinked);
  return blinked;
};
