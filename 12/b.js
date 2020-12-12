fs = require('fs');
let actions = fs.readFileSync('input.txt').toString().trimEnd().split("\n");

let waypoint = [10, 1];
let position = [0, 0];

for(let action of actions) {
    const type = action[0];
    const value = Number.parseInt(action.substr(1));

    switch(type) {
        case "N": waypoint[1] += value; break;
        case "S": waypoint[1] -= value; break;
        case "E": waypoint[0] += value; break;
        case "W": waypoint[0] -= value; break;
        case "F": 
            position[0] += (waypoint[0] * value);
            position[1] += (waypoint[1] * value);
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
    waypoint = [waypoint[1] * x, waypoint[0] * -x];
}

console.log(waypoint);
const result = Math.abs(position[0]) + Math.abs(position[1]);
console.log("Result: " + result);
