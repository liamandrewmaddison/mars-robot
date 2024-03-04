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
exports.Robot = void 0;
var Robot = /** @class */ (function () {
    function Robot(grid, position) {
        this.validatePosition(position);
        this.grid = grid;
        this.position = position;
    }
    Robot.rotateLeft = function (direction) {
        var index = (Robot.directions.indexOf(direction) - 1 + 4) % 4;
        return Robot.directions[index];
    };
    Robot.rotateRight = function (direction) {
        var index = (Robot.directions.indexOf(direction) + 1) % 4;
        return Robot.directions[index];
    };
    Robot.moveForward = function (position) {
        switch (position.direction) {
            case 'N': return __assign(__assign({}, position), { y: position.y + 1 });
            case 'E': return __assign(__assign({}, position), { x: position.x + 1 });
            case 'S': return __assign(__assign({}, position), { y: position.y - 1 });
            case 'W': return __assign(__assign({}, position), { x: position.x - 1 });
        }
    };
    Robot.prototype.validatePosition = function (position) {
        // validate the maximum value for any coordinate is 50.
        if (position.x > 50 || position.y > 50) {
            throw new Error('Position coordinates cannot be more than 50');
        }
    };
    Robot.prototype.processInstructions = function (instructions) {
        // validate string is no more than 100 characters
        if (instructions.length > 100) {
            throw new Error('Instructions cannot be more than 100 characters');
        }
        for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
            var instruction = instructions_1[_i];
            if (instruction === 'L') {
                this.position.direction = Robot.rotateLeft(this.position.direction);
            }
            else if (instruction === 'R') {
                this.position.direction = Robot.rotateRight(this.position.direction);
            }
            else { // instruction === 'F'
                var newPosition = Robot.moveForward(this.position);
                if (newPosition.x >= 0 && newPosition.x <= this.grid.maxX && newPosition.y >= 0 && newPosition.y <= this.grid.maxY) {
                    this.position = newPosition;
                }
                else if (!this.grid.scents.has("".concat(this.position.x, ",").concat(this.position.y))) {
                    this.grid.scents.add("".concat(this.position.x, ",").concat(this.position.y));
                    return "".concat(this.position.x, " ").concat(this.position.y, " ").concat(this.position.direction, " LOST");
                }
            }
        }
        return "".concat(this.position.x, " ").concat(this.position.y, " ").concat(this.position.direction);
    };
    Robot.directions = ['N', 'E', 'S', 'W'];
    return Robot;
}());
exports.Robot = Robot;
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
var grid = { maxX: 5, maxY: 3, scents: new Set() };
var position1 = { x: 1, y: 1, direction: 'E' };
var robot1 = new Robot(grid, position1);
console.log(robot1.processInstructions('RFRFRFRF')); // 1 1 E
var position2 = { x: 3, y: 2, direction: 'N' };
var robot2 = new Robot(grid, position2);
console.log(robot2.processInstructions('FRRFLLFFRRFLL')); // 3 3 N LOST
var position3 = { x: 0, y: 3, direction: 'W' };
var robot3 = new Robot(grid, position3);
console.log(robot3.processInstructions('LLFFFLFLFL')); // 2 3 S
