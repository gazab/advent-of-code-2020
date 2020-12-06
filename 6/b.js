fs = require('fs');
const groups = fs.readFileSync('input.txt').toString().trimEnd().split("\n\n");
let result = 0;
for(let g of groups) {
    const dict = {};
    const answers = g.split("\n")
    for(let a of answers) {
        for(let c of a) {
            dict[c] = dict[c] == undefined ? 1 : ++dict[c];
        }
    }
    for(var key in dict) {
        result += dict[key] == answers.length ? 1 : 0;
    }
}

console.log(result);