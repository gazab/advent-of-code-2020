fs = require('fs');
const groups = fs.readFileSync('input.txt').toString().trimEnd().split("\n\n");
let result = 0;
for(let g of groups) {
    const dict = {};
    for(let a of g.split("\n")) {
        for(let c of a) {
            dict[c] = dict[c] == undefined ? 1 : ++dict[c];
        }
    }
    result += Object.keys(dict).length;
}

console.log(result);