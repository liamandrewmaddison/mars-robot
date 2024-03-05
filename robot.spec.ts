import { Grid, Position, Robot, Direction } from "./robot.ts";

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

  it(`should throw an error for instructions with more than 100 characters`, () => {
    const position: Position = { x: 0, y: 3, direction: 'W' as Direction };
    const robot = new Robot(grid, position);

    expect(() => robot.processInstructions(`L`.repeat(101))).toThrow('Instructions cannot be more than 100 characters');
  });

  it(`should throw an error for position coordinates x more than 50`, () => {
    const position: Position = { x: 51, y: 0, direction: 'W' as Direction };

    expect(() => new Robot(grid, position)).toThrow('Position coordinates cannot be more than 50');
  });

  it(`should throw an error for position coordinates y more than 50`, () => {
    const position: Position = { x: 0, y: 51, direction: 'W' as Direction };

    expect(() => new Robot(grid, position)).toThrow('Position coordinates cannot be more than 50');
  });
});