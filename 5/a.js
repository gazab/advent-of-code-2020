fs = require('fs');
const array = fs.readFileSync('input.txt').toString().trimEnd().split("\n");
let result = 0;
for(let b of array) {
    const bin = b.replace(/F|L/g, "0").replace(/B|R/g, "1");
    const row = parseInt(bin.substr(0, 7), 2);
    const column = parseInt(bin.substr(7, 3), 2);
    const id = row * 8 + column;
    result = id > result ? id : result;
    console.log(b + " (" + bin + ") = row: " + row + ", column: " + column + ". Id: " + id);
}
console.log(result);