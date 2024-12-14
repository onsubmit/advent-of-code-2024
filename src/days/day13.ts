export const getPartOneSolution = (input: string): string => {
  const lines = input.split('\n').filter(Boolean);
  const chunkSize = 3;
  let cost = 0;
  for (let i = 0; i < lines.length; i += chunkSize) {
    const chunk = lines.slice(i, i + chunkSize);
    const matrix = new Matrix(chunk);
    const { a, b } = matrix.solve();
    if (Number.isInteger(a) && Number.isInteger(b)) {
      cost += 3 * a + b;
    }
  }

  return cost.toString();
};

export const getPartTwoSolution = (input: string): string => {
  const lines = input.split('\n').filter(Boolean);
  const chunkSize = 3;
  let cost = 0;
  for (let i = 0; i < lines.length; i += chunkSize) {
    const chunk = lines.slice(i, i + chunkSize);
    const matrix = new Matrix(chunk);
    matrix.px += 10000000000000;
    matrix.py += 10000000000000;
    const { a, b } = matrix.solve();
    if (Number.isInteger(a) && Number.isInteger(b)) {
      cost += 3 * a + b;
    }
  }

  return cost.toString();
};

class Matrix {
  ax = 0;
  ay = 0;
  bx = 0;
  by = 0;
  px = 0;
  py = 0;

  constructor(lines: Array<string>) {
    for (const line of lines) {
      if (line.startsWith('Button A')) {
        const [buttonAx, buttonAy] = line.split('Button A')[1].match(/\d+/g)!.map(Number);
        this.ax = buttonAx;
        this.ay = buttonAy;
      } else if (line.startsWith('Button B')) {
        const [buttonBx, buttonBy] = line.split('Button B')[1].match(/\d+/g)!.map(Number);
        this.bx = buttonBx;
        this.by = buttonBy;
      } else {
        const [prizeX, prizeY] = line.split('Prize')[1].match(/\d+/g)!.map(Number);
        this.px = prizeX;
        this.py = prizeY;
      }
    }
  }

  solve = (): { a: number; b: number } => {
    const D = this.ax * this.by - this.bx * this.ay;
    const Da = this.px * this.by - this.bx * this.py;
    const Db = this.ax * this.py - this.px * this.ay;

    const a = Da / D;
    const b = Db / D;
    return { a, b };
  };
}
