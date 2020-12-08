fs = require('fs');
const program = fs.readFileSync('input.txt').toString().trimEnd().split("\n");
const instructionParser = new RegExp(/(?<instruction>\w{3}) (?<argument>.*)/);

let acc = 0;
const history = new Set();

for(let pc = 0; pc < program.length; pc++) {
    let { groups: {instruction, argument } } = instructionParser.exec(program[pc]);
    const arg = Number.parseInt(argument);
    switch(instruction) {
        case "nop":
            break;
        case "acc":
            acc += arg;
            break;
        case "jmp":
            pc += (arg-1);
            break;
    }
    loopcheck(pc);
}


function loopcheck(pc) {
    if(history.has(pc)) {
        console.log("Loop detected! Kernel panic! Acc value: " + acc);
        process.exit(1);
    } else {
        history.add(pc);
    }
}