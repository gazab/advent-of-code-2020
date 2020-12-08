fs = require('fs');
const program = fs.readFileSync('input.txt').toString().trimEnd().split("\n");
const instructionParser = new RegExp(/(?<instruction>\w{3}) (?<argument>.*)/);

let acc = 0;
let history = new Set();
let corruptionHistory = new Set();
let hasFixed = false;

// Run and test corruption fixes until program finishes
while(!run()) {
    acc = 0;
    history = new Set();
    hasFixed = false;
}

function run() {
    for(let pc = 0; pc < program.length; pc++) {
        let { groups: {instruction, argument } } = instructionParser.exec(program[pc]);
        const arg = Number.parseInt(argument);

        // Fix corruption
        if(!hasFixed && !corruptionHistory.has(pc) && instruction != "acc") {
            console.log("Fixing instruction at " + pc);
            instruction = instruction == "nop" ? "jmp" : "nop";
            hasFixed = true;
            corruptionHistory.add(pc);
        }

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
        if(isloop(pc)) {
            return false;
        }
    }

    console.log("Program finished. Acc value: " + acc);
    return true;
}

function isloop(pc) {
    if(history.has(pc)) {
        console.log("Loop detected! Kernel panic! Acc value: " + acc);
        return true;
    } else {
        history.add(pc);
    }
}