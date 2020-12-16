//const input = [0,3,6];
//const input = [3,1,2];
const input = [9,6,0,10,18,2,1];

const a = 2020;
const b = 30000000;

let turn = 1;
const memory = new Map();

let lastNumber = undefined;
while(turn <= b) {
    let number = undefined;
    if(input[turn-1] != undefined){
        number = input[turn-1];
    } else if(memory.has(lastNumber)) {
        number = (turn-1) - memory.get(lastNumber);
    } else {
        number = 0;
    }
    // Store in memory
    if(lastNumber != undefined)
        memory.set(lastNumber, turn-1);
    lastNumber = number;
    turn++;
}

console.log(lastNumber);