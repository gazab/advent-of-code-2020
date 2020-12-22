fs = require('fs');
let life = fs.readFileSync('input.txt').toString().trimEnd().split("\n").map(x => x.split(""));

const gridSize = 15;
const state = new Map();

// Initial input
let x = y = z = w = 0;
for(row of life) {
    for(char of row) {
        if(char == "#") {
            state.set(x+","+y+","+z+","+w, char);
        }
        x++;
    }
    x = 0;
    y++;
}

function calculateNextState(state) {
    const newState = new Map(JSON.parse(JSON.stringify(Array.from(state))));

    for(let x = -gridSize; x <= gridSize; x++)
        for(let y = -gridSize; y <= gridSize; y++)
            for(let z = -gridSize; z <= gridSize; z++)
                for(let w = -gridSize; w <= gridSize; w++) {
                const coord = x+","+y+","+z+","+w;
                const activeNeighbours = numberOfActiveNeighbours(x, y, z, w, state, newState);
                if(state.has(coord)) {
                    if(!(activeNeighbours == 2 || activeNeighbours == 3))
                        newState.delete(coord) 
                } else {
                    if(activeNeighbours == 3)
                        newState.set(coord, "#");
                }      
            }
    return newState;
}

function numberOfActiveNeighbours(xCoord, yCoord, zCoord, wCoord, state) {
    let count = 0;
    for(let x = xCoord-1; x <= xCoord+1; x++)
        for(let y = yCoord-1; y <= yCoord+1; y++)
            for(let z = zCoord-1; z <= zCoord+1; z++)
                for(let w = wCoord-1; w <= wCoord+1; w++) {
                if(!(x == xCoord && y == yCoord && z == zCoord && w == wCoord)) {
                    const coord = x+","+y+","+z+","+w;
                    const value = state.get(coord);
                    //console.log("Checking: " + coord + " (" + value + ")");
                    if(value == "#") count++; 
                }
            }
    return count;
}

// Do it.. six times
let nextState = calculateNextState(state);
nextState = calculateNextState(nextState);
nextState = calculateNextState(nextState);
nextState = calculateNextState(nextState);
nextState = calculateNextState(nextState);
nextState = calculateNextState(nextState);

console.log(nextState.size);

