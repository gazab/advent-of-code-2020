fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trimEnd().split("\n").map(x => Number.parseInt(x));

const goal = 507622668;
let cycles = 0;


for(let i = 0; i < input.length; i++) {
    let sum = 0;
    for(let j = i; j < input.length; j++) {
        sum += input[j];
        cycles++;
        if(sum > goal) {
            break;
        }
        if(sum == goal) {
            console.log("Found sum!");
            console.log("Row " + i + " and row " + j);
            let range = input.slice(i, j).sort((x, y) => x - y);
            const result = range[0] + range[range.length-1];
            console.log("Result: " + result);
            console.log("Cycles:" + cycles);
            process.exit(0);
        }
    }
}
