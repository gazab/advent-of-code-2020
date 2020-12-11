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
    for(let y = Math.max(0, yCoord-radius); y <= Math.min(state.length-1, yCoord+radius); y++) {
        for(let x = Math.max(0, xCoord-radius); x <= Math.min(state[0].length-1, xCoord+radius); x++) {
            occupied += ((y !== yCoord || x !== xCoord) && state[y][x] == "#") ? 1 : 0;
        }
    }
    
    if(seat == "L" && occupied == 0) return "#";
    else if (seat == "#" && occupied >= 4) return "L";
    else return seat;
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

