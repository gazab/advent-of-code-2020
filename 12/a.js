fs = require('fs');
let actions = fs.readFileSync('input.txt').toString().trimEnd().split("\n");

let distance = [0, 0];
let direction = [1, 0];

for(let action of actions) {
    const type = action[0];
    const value = Number.parseInt(action.substr(1));

    switch(type) {
        case "N": distance[1] += value; break;
        case "S": distance[1] -= value; break;
        case "E": distance[0] += value; break;
        case "W": distance[0] -= value; break;
        case "F": 
            distance[0] += (direction[0] * value);
            distance[1] += (direction[1] * value);
            break;
        case "R":
        case "L":    
            switch(value) {
                case 270: rotate90(type);
                case 180: rotate90(type);
                case 90: rotate90(type);
                    break;
            }
    }
}

function rotate90(dir) {
    const x = dir == "R" ? 1 : -1;
    direction = [direction[1] * x, direction[0] * -x];
}

console.log(distance);
const result = Math.abs(distance[0]) + Math.abs(distance[1]);
console.log("Result: " + result);
