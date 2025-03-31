export type Direction = 'N' | 'E' | 'S' | 'W';
export type Position = { x: number, y: number, direction: Direction };
export type Grid = { maxX: number, maxY: number, scents: Set<string> };

export class Robot {
    private static directions: Direction[] = ['N', 'E', 'S', 'W'];
    private position: Position;
    private grid: Grid;

    constructor(grid: Grid, position: Position) {
        this.validatePosition(position);

        this.grid = grid;
        this.position = position;
    }

    private static rotateLeft(direction: Direction): Direction {
        const index = (Robot.directions.indexOf(direction) - 1 + 4) % 4;
        return Robot.directions[index];
    }

    private static rotateRight(direction: Direction): Direction {
        const index = (Robot.directions.indexOf(direction) + 1) % 4;
        return Robot.directions[index];
    }

    private static moveForward(position: Position): Position {
        switch (position.direction) {
            case 'N': return { ...position, y: position.y + 1 };
            case 'E': return { ...position, x: position.x + 1 };
            case 'S': return { ...position, y: position.y - 1 };
            case 'W': return { ...position, x: position.x - 1 };
        }
    }

    private validatePosition(position: Position): void {
        // validate the maximum value for any coordinate is 50.
        if (position.x > 50 || position.y > 50) {
            throw new Error('Position coordinates cannot be more than 50');
        }
    }

    processInstructions(instructions: string): string {
        // validate string is no more than 100 characters
        if (instructions.length > 100) {
            throw new Error('Instructions cannot be more than 100 characters');
        }

        for (const instruction of instructions) {
            if (instruction === 'L') {
                this.position.direction = Robot.rotateLeft(this.position.direction);
            } else if (instruction === 'R') {
                this.position.direction = Robot.rotateRight(this.position.direction);
            } else { // instruction === 'F'
                const newPosition = Robot.moveForward(this.position);
                if (newPosition.x >= 0 && newPosition.x <= this.grid.maxX && newPosition.y >= 0 && newPosition.y <= this.grid.maxY) {
                    this.position = newPosition;
                } else if (!this.grid.scents.has(`${this.position.x},${this.position.y}`)) {
                    this.grid.scents.add(`${this.position.x},${this.position.y}`);
                    return `${this.position.x} ${this.position.y} ${this.position.direction} LOST`;
                }
            }
        }
        return `${this.position.x} ${this.position.y} ${this.position.direction}`;
    }
}

/**
 * Run the following instructions:
 * 
 * 5 3
 * 1 1 E
 * RFRFRFRF
 * 3 2 N
 * FRRFLLFFRRFLL
 * 0 3 W
 * LLFFFLFLFL
 */
const grid: Grid = { maxX: 5, maxY: 3, scents: new Set<string>() };
const position1: Position = { x: 1, y: 1, direction: 'E' };

const robot1 = new Robot(grid, position1);
console.log(robot1.processInstructions('RFRFRFRF')); // 1 1 E

const position2: Position = { x: 3, y: 2, direction: 'N' };
const robot2 = new Robot(grid, position2);
console.log(robot2.processInstructions('FRRFLLFFRRFLL')); // 3 3 N LOST

const position3: Position = { x: 0, y: 3, direction: 'W' };
const robot3 = new Robot(grid, position3);
console.log(robot3.processInstructions('LLFFFLFLFL')); // 2 3 S