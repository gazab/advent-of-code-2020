fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trimEnd().split("\n").map(x => Number.parseInt(x));

const preambleSize = 25;

for(let i = 0; i <= input.length - preambleSize - 2; i++) {
    const subarray = input.slice(i, i+preambleSize);
    const goal = input[i + preambleSize];
    findExploit(subarray, goal);
}

function findExploit(data, goal) {
    combi = new Set();
    for(let x = 0; x < data.length; x++) {
        let xval = data[x];
        for(let y = 1; y < data.length; y++) {
            let yval = data[y];
            if(xval != yval) {
                combi.add(xval+yval);
            }
        }
    }
    if(!combi.has(goal)) {
        console.log(goal + " not exploitable!");
        process.exit(0);
    }
}