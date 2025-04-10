"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionControl = exports.Rover = void 0;
var Rover = /** @class */ (function () {
    function Rover(grid, position) {
        this.grid = grid; // Ensure the grid is properly set
        this.validatePosition(position);
        this.position = position;
    }
    Rover.rotateLeft = function (direction) {
        var index = (Rover.directions.indexOf(direction) - 1 + 4) % 4;
        return Rover.directions[index];
    };
    Rover.rotateRight = function (direction) {
        var index = (Rover.directions.indexOf(direction) + 1) % 4;
        return Rover.directions[index];
    };
    Rover.moveForward = function (position) {
        switch (position.direction) {
            case 'N': return __assign(__assign({}, position), { y: position.y + 1 });
            case 'E': return __assign(__assign({}, position), { x: position.x + 1 });
            case 'S': return __assign(__assign({}, position), { y: position.y - 1 });
            case 'W': return __assign(__assign({}, position), { x: position.x - 1 });
        }
    };
    Rover.prototype.validatePosition = function (position) {
        if (position.x < 0 || position.y < 0 ||
            position.x > this.grid.maxX || position.y > this.grid.maxY) {
            throw new Error("Position (".concat(position.x, ", ").concat(position.y, ") is outside the grid boundaries"));
        }
    };
    Rover.prototype.processInstructions = function (instructions) {
        for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
            var instruction = instructions_1[_i];
            if (instruction === 'L') {
                this.position.direction = Rover.rotateLeft(this.position.direction);
            }
            else if (instruction === 'R') {
                this.position.direction = Rover.rotateRight(this.position.direction);
            }
            else if (instruction === 'M') {
                var newPosition = Rover.moveForward(this.position);
                if (newPosition.x >= 0 && newPosition.x <= this.grid.maxX &&
                    newPosition.y >= 0 && newPosition.y <= this.grid.maxY) {
                    this.position = newPosition;
                }
            }
        }
        return "".concat(this.position.x, " ").concat(this.position.y, " ").concat(this.position.direction);
    };
    Rover.directions = ['N', 'E', 'S', 'W'];
    return Rover;
}());
exports.Rover = Rover;
var MissionControl = /** @class */ (function () {
    function MissionControl() {
        // No need to initialize the grid here; it will be set in processCommands
    }
    MissionControl.prototype.deployRover = function (positionInput, instructionsInput) {
        var _a = positionInput.split(' '), x = _a[0], y = _a[1], direction = _a[2];
        var position = {
            x: parseInt(x, 10),
            y: parseInt(y, 10),
            direction: direction
        };
        // Ensure the grid is properly passed to the Rover
        var rover = new Rover(this.grid, position);
        return rover.processInstructions(instructionsInput);
    };
    MissionControl.prototype.processCommands = function (input) {
        var lines = input.trim().split('\n');
        if (lines.length < 3 || lines.length % 2 === 0) {
            throw new Error('Invalid input format. Ensure grid size and rover commands are provided.');
        }
        var gridLine = lines[0];
        var _a = gridLine.split(' ').map(function (value) {
            var parsed = parseInt(value, 10);
            if (isNaN(parsed) || parsed < 0) {
                throw new Error('Grid size must be non-negative integers.');
            }
            return parsed;
        }), maxX = _a[0], maxY = _a[1];
        // Initialize the grid
        this.grid = { maxX: maxX, maxY: maxY };
        var result = '';
        for (var i = 1; i < lines.length; i += 2) {
            var positionInput = lines[i];
            var instructionsInput = lines[i + 1];
            result += this.deployRover(positionInput, instructionsInput) + '\n';
        }
        return result.trim();
    };
    return MissionControl;
}());
exports.MissionControl = MissionControl;
// Example usage:
// const testInput = `5 5
// 1 2 N
// LMLMLMLMM
// 3 3 E
// MMRMMRMRRM`;
//
var testInput = "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM";
var mission = new MissionControl();
console.log(mission.processCommands(testInput));
// Expected output:
// 1 3 N
// 5 1 E
