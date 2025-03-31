import { Rover, MissionControl, Direction, Position, Grid } from "./robot.v2";

describe('Mars Rover', () => {
  describe('Rover', () => {
    let grid: Grid;
    
    beforeEach(() => {
      grid = { maxX: 5, maxY: 5 };
    });
    
    test('should turn left correctly', () => {
      const position: Position = { x: 1, y: 2, direction: 'N' };
      const rover = new Rover(grid, position);
      expect(rover.processInstructions('L')).toBe('1 2 W');
    });
    
    test('should turn right correctly', () => {
      const position: Position = { x: 1, y: 2, direction: 'N' };
      const rover = new Rover(grid, position);
      expect(rover.processInstructions('R')).toBe('1 2 E');
    });
    
    test('should move forward correctly', () => {
      const position: Position = { x: 1, y: 2, direction: 'N' };
      const rover = new Rover(grid, position);
      expect(rover.processInstructions('M')).toBe('1 3 N');
    });
    
    test('should not move beyond grid boundaries', () => {
      const position: Position = { x: 5, y: 5, direction: 'N' };
      const rover = new Rover(grid, position);
      expect(rover.processInstructions('M')).toBe('5 5 N');
    });
    
    test('should process complex instructions correctly', () => {
      const position: Position = { x: 1, y: 2, direction: 'N' };
      const rover = new Rover(grid, position);
      expect(rover.processInstructions('LMLMLMLMM')).toBe('1 3 N');
    });
  });
  
  describe('MissionControl', () => {
    test('should process multiple rover commands correctly', () => {
      const testInput = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;
      
      const mission = new MissionControl("5 5");
      expect(mission.processCommands(testInput)).toBe('1 3 N\n5 1 E');
    });
  });
});