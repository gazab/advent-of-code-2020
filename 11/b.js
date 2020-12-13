fs = require('fs');
let state = fs.readFileSync('input.txt').toString().trimEnd().split("\n").map(row => [...row]);

let changed = true;
let iterations = 0;
printState(state);
console.log("--------");

while(changed) {
    changed = false;
    const nextState = JSON.parse(JSON.stringify(state));
    for(let y = 0; y < state.length; y++) {
        let row = state[y];
        for(let x = 0; x < row.length; x++) {
            const current = state[y][x];
            const next = getNext(x, y, state);
            if(current != next) changed = true;
            nextState[y][x] = next;
        }
    }
    state = JSON.parse(JSON.stringify(nextState));;
    iterations++;
}

printState(state);

console.log("Final occupied seats: " + countOccupiedSeats(state));
console.log("Stable after " + iterations + " iterations");

function getNext(xCoord, yCoord, state) {
    const seat = state[yCoord][xCoord];
    if(seat == ".") return ".";

    // Check seats around
    let occupied = 0;
    const radius = 1;
    for(let yDir = -1; yDir <= 1; yDir++) {
        for(let xDir = -1; xDir <= 1; xDir++) {
            if(!(xDir == 0 && yDir == 0)) {
                occupied += occupiedSeatIndirection(xCoord, yCoord, xDir, yDir, state) ? 1 : 0;
            }
        }
    }
    
    if(seat == "L" && occupied == 0) return "#";
    else if (seat == "#" && occupied >= 5) return "L";
    else return seat;
}

function occupiedSeatIndirection(xCoord, yCoord, xDir, yDir, state) {
    const row = state[yCoord + yDir]
    if(row == undefined) return false;
    const seat = row[xCoord + xDir];
    if(seat == undefined) return false;
    if(seat == "L") return false;
    if(seat == "#") return true;

    return occupiedSeatIndirection(xCoord + xDir, yCoord + yDir, xDir, yDir, state);
}

function printState(state) {
    for(let row of state) {
        for(let char of row) {
            process.stdout.write(char);
        }
        process.stdout.write("\n");
    }
}

function countOccupiedSeats(state) {
    let occupied = 0;
    for(let row of state) {
        for(let char of row) {
            if(char == "#") occupied++;
        }
    }
    return occupied;
}

