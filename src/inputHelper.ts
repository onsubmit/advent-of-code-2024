import memoizee from 'memoizee';

const splitLines = memoizee(
  (input: string, options: Partial<{ retainEmptyLines: boolean }>) => {
    const { retainEmptyLines } = options;
    const lines = input.trim().split('\n');
    return retainEmptyLines ? lines : lines.filter(Boolean);
  },
  { primitive: true }
);

export const inputTo2dArray = <T, TValue extends string = string>(
  input: string,
  mapper: (character: TValue, row: number, column: number) => T,
  options: Partial<{ columnSplitter: string; retainEmptyLines: boolean }> = {
    columnSplitter: '',
    retainEmptyLines: false,
  }
): Array<Array<T>> => {
  const lines = splitLines(input, options);
  return lines.map<T[]>((line, row) =>
    line
      .split(options?.columnSplitter ?? '')
      .map<T>((character, column) => mapper(character as TValue, row, column))
  );
};
