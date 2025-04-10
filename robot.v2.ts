export type Direction = 'N' | 'E' | 'S' | 'W';
export type Position = { x: number, y: number, direction: Direction };
export type Grid = { maxX: number, maxY: number };

export class Rover {
    private static directions: Direction[] = ['N', 'E', 'S', 'W'];
    private position: Position;
    private grid: Grid;

    constructor(grid: Grid, position: Position) {
        this.grid = grid; // Ensure the grid is properly set
        this.validatePosition(position);
        this.position = position;
    }

    private static rotateLeft(direction: Direction): Direction {
        const index = (Rover.directions.indexOf(direction) - 1 + 4) % 4;
        return Rover.directions[index];
    }

    private static rotateRight(direction: Direction): Direction {
        const index = (Rover.directions.indexOf(direction) + 1) % 4;
        return Rover.directions[index];
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
        if (position.x < 0 || position.y < 0 || 
            position.x > this.grid.maxX || position.y > this.grid.maxY) {
            throw new Error(`Position (${position.x}, ${position.y}) is outside the grid boundaries`);
        }
    }

    processInstructions(instructions: string): string {
        for (const instruction of instructions) {
            if (instruction === 'L') {
                this.position.direction = Rover.rotateLeft(this.position.direction);
            } else if (instruction === 'R') {
                this.position.direction = Rover.rotateRight(this.position.direction);
            } else if (instruction === 'M') {
                const newPosition = Rover.moveForward(this.position);
                if (newPosition.x >= 0 && newPosition.x <= this.grid.maxX && 
                    newPosition.y >= 0 && newPosition.y <= this.grid.maxY) {
                    this.position = newPosition;
                }
            }
        }
        return `${this.position.x} ${this.position.y} ${this.position.direction}`;
    }
}

export class MissionControl {
    private grid!: Grid; // Use definite assignment assertion to indicate it will be initialized later

    constructor() {
        // No need to initialize the grid here; it will be set in processCommands
    }

    deployRover(positionInput: string, instructionsInput: string): string {
        const [x, y, direction] = positionInput.split(' ');
        const position: Position = {
            x: parseInt(x, 10),
            y: parseInt(y, 10),
            direction: direction as Direction
        };

        // Ensure the grid is properly passed to the Rover
        const rover = new Rover(this.grid, position);
        return rover.processInstructions(instructionsInput);
    }

    processCommands(input: string): string {
        const lines = input.trim().split('\n');
        if (lines.length < 3 || lines.length % 2 === 0) {
            throw new Error('Invalid input format. Ensure grid size and rover commands are provided.');
        }

        const gridLine = lines[0];
        const [maxX, maxY] = gridLine.split(' ').map((value) => {
            const parsed = parseInt(value, 10);
            if (isNaN(parsed) || parsed < 0) {
                throw new Error('Grid size must be non-negative integers.');
            }
            return parsed;
        });

        // Initialize the grid
        this.grid = { maxX, maxY };

        let result = '';

        for (let i = 1; i < lines.length; i += 2) {
            const positionInput = lines[i];
            const instructionsInput = lines[i + 1];

            result += this.deployRover(positionInput, instructionsInput) + '\n';
        }

        return result.trim();
    }
}

// Example usage:
// const testInput = `5 5
// 1 2 N
// LMLMLMLMM
// 3 3 E
// MMRMMRMRRM`;
//
const testInput = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

const mission = new MissionControl();
console.log(mission.processCommands(testInput));
// Expected output:
// 1 3 N
// 5 1 E