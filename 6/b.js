fs = require('fs');
const groups = fs.readFileSync('input2.txt').toString().trimEnd().split("\n\n");
let result = 0;
for(let g of groups) {
    const dict = new Map();
    const answers = g.split("\n")
    for(let a of answers) {
        for(let c of a) {
            dict.set(c, !dict.has(c) ? 1 : dict.get(c) + 1 );
        }
    }
    for(let value of dict.values()) {
        result += value == answers.length ? 1 : 0;
    };
}

console.log(result);