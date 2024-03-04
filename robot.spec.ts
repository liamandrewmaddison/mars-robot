import { Grid, Position, Robot } from "./robot";
import { Direction } from "./robot";

describe('Mars Robot', () => {
  const grid: Grid = { maxX: 5, maxY: 3, scents: new Set<string>() };

  it(`should process instructions for input {
    5 3 - Grid
    1 1 E - Position
    RFRFRFRF - Instructions
  }`, () => {
    const position: Position = { x: 1, y: 1, direction: 'E' as Direction };
    const robot = new Robot(grid, position);

    expect(robot.processInstructions('RFRFRFRF')).toBe('1 1 E');
  });

  it(`should process instructions for input {
    5 3 - Grid
    3 2 N - Position
    FRRFLLFFRRFLL - Instructions
  }`, () => {
    const position: Position = { x: 3, y: 2, direction: 'N' as Direction };
    const robot = new Robot(grid, position);

    expect(robot.processInstructions('FRRFLLFFRRFLL')).toBe('3 3 N LOST');
  });

  it(`should process instructions for input {
    5 3 - Grid
    0 3 W - Position
    LLFFFLFLFL - Instructions
  }`, () => {
    const position: Position = { x: 0, y: 3, direction: 'W' as Direction };
    const robot = new Robot(grid, position);

    expect(robot.processInstructions('LLFFFLFLFL')).toBe('2 3 S');
  });
});