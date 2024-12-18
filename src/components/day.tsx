import { Button, Link, TextField } from '@mui/material';
import { useState } from 'react';

import { getInput, setInput } from '../localStorage';
import styles from './day.module.css';

export type DayProps = {
  day: number;
  getPartOneSolution: (input: string) => string;
  getPartTwoSolution: (input: string) => string;
};

type DayState = {
  input: string;
  output: string;
  iterations: number;
  timing: string;
};

export default function Day({ day, getPartOneSolution, getPartTwoSolution }: DayProps) {
  const [part1State, setPart1State] = useState<DayState>({
    input: getInput(day, 1),
    output: '',
    iterations: 1,
    timing: '',
  });

  const [part2State, setPart2State] = useState<DayState>({
    input: getInput(day, 2),
    output: '',
    iterations: 1,
    timing: '',
  });

  const cacheAndSetPart1State = (input: string): void => {
    setInput(day, 1, input);
    setPart1State((s) => ({ ...s, input }));
  };

  const cacheAndSetPart2State = (input: string): void => {
    setInput(day, 2, input);
    setPart2State((s) => ({ ...s, input }));
  };

  return (
    <div className={styles.day}>
      <h1>Day {day}</h1>
      <p>
        <Link href={`https://adventofcode.com/2024/day/${day}`} target="_blank">
          Problem
        </Link>
      </p>
      <p>
        <Link href={`https://adventofcode.com/2024/day/${day}/input`} target="_blank">
          Input
        </Link>
      </p>
      <div className={styles.parts}>
        <div className={styles.part}>
          <TextField
            label="Part 1 input"
            multiline
            rows={4}
            value={part1State.input}
            onChange={(e) => cacheAndSetPart1State(e.target.value)}
          />
          <TextField label="Part 1 output" disabled value={part1State.output} />
          <TextField label="Part 1 timing" disabled value={part1State.timing} />
          <div className={styles.buttonRow}>
            <Button
              className={styles.getSolution}
              variant="contained"
              onClick={() => {
                const startTime = performance.now();

                const solution = getPartOneSolution(part1State.input);
                for (let attempt = 0; attempt < part1State.iterations - 1; attempt++) {
                  getPartOneSolution(part1State.input);
                }

                const endTime = performance.now();

                setPart1State((s) => ({
                  ...s,
                  output: solution,
                  timing: `${endTime - startTime}ms`,
                }));
              }}
            >
              Get part 1 solution
            </Button>
            <TextField
              id="outlined-number"
              className={styles.iterations}
              label="Iterations"
              type="number"
              value={part1State.iterations}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                if (newValue > 0 && newValue < 1000) {
                  setPart1State((s) => ({ ...s, iterations: parseInt(e.target.value, 10) }));
                }
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <div className={styles.part}>
          <TextField
            label="Part 2 input"
            multiline
            rows={4}
            value={part2State.input}
            onChange={(e) => cacheAndSetPart2State(e.target.value)}
          />
          <TextField label="Part 2 output" disabled value={part2State.output} />
          <TextField label="Part 2 timing" disabled value={part2State.timing} />
          <div className={styles.buttonRow}>
            <Button
              className={styles.getSolution}
              variant="contained"
              onClick={() => {
                const startTime = performance.now();

                const solution = getPartTwoSolution(part2State.input);
                for (let attempt = 0; attempt < part2State.iterations - 1; attempt++) {
                  getPartTwoSolution(part2State.input);
                }

                const endTime = performance.now();

                setPart2State((s) => ({
                  ...s,
                  output: solution,
                  timing: `${endTime - startTime}ms`,
                }));
              }}
            >
              Get part 2 solution
            </Button>
            <TextField
              id="outlined-number"
              className={styles.iterations}
              label="Iterations"
              type="number"
              value={part2State.iterations}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                if (newValue > 0 && newValue < 1000) {
                  setPart2State((s) => ({ ...s, iterations: parseInt(e.target.value, 10) }));
                }
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <Button
          variant="outlined"
          onClick={() => {
            setInput(day, 1, '');
            setInput(day, 2, '');

            setPart1State((s) => ({ ...s, input: '' }));
            setPart2State((s) => ({ ...s, input: '' }));
          }}
        >
          Clean input cache
        </Button>
      </div>
    </div>
  );
}
