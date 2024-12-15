import { multiplyArray } from '../arrayMethods';

export const getPartOneSolution = (input: string): string => {
  const width = 101;
  const height = 103;
  const robots = input.split('\n').map((line) => new Robot(line, width, height));
  robots.forEach((robot) => robot.move(100));
  const quadrants = [0, 0, 0, 0];

  const midX = Math.floor(width / 2);
  const midY = Math.floor(height / 2);
  robots.forEach((robot) => {
    if (robot.x === midX || robot.y === midY) {
      return;
    }

    let quadrant = 0;
    if (robot.x < midX) {
      quadrant = robot.y < midY ? 0 : 2;
    } else {
      quadrant = robot.y < midY ? 1 : 3;
    }

    quadrants[quadrant]++;
  });

  const product = multiplyArray(quadrants);
  return product.toString();
};

export const getPartTwoSolution = (input: string): string => {
  return '';
};

class Robot {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;

  width = 0;
  height = 0;

  constructor(line: string, width: number, height: number) {
    const [x, y, vx, vy] = line.match(/-?\d+/g)!.map(Number);
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.width = width;
    this.height = height;
  }

  move = (seconds: number): void => {
    this.x = (this.x + this.vx * seconds) % this.width;
    this.y = (this.y + this.vy * seconds) % this.height;

    if (this.x < 0) {
      this.x = this.width + (this.x % this.width);
    }

    if (this.y < 0) {
      this.y = this.height + (this.y % this.height);
    }
  };
}
