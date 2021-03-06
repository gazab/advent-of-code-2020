fs = require('fs');
let life = fs.readFileSync('example.txt').toString().trimEnd().split("\n").map(x => x.split(""));

const gridSize = 15;
const state = new Map();

// Initial input
let x = y = z = 0;
for(row of life) {
    for(char of row) {
        if(char == "#") {
            state.set(x+","+y+","+z, char);
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
            for(let z = -gridSize; z <= gridSize; z++) {
                const coord = x+","+y+","+z;
                const activeNeighbours = numberOfActiveNeighbours(x, y, z, state, newState);
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

function numberOfActiveNeighbours(xCoord, yCoord, zCoord, state) {
    let count = 0;
    for(let x = xCoord-1; x <= xCoord+1; x++)
        for(let y = yCoord-1; y <= yCoord+1; y++)
            for(let z = zCoord-1; z <= zCoord+1; z++) {
                if(!(x == xCoord && y == yCoord && z == zCoord)) {
                    const coord = x+","+y+","+z;
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

