fs = require('fs');
const array = fs.readFileSync('input.txt').toString().trimEnd().split("\n");
let result = 0;
let ids = [];
for(let b of array) {
    const bin = b.replace(/F|L/g, "0").replace(/B|R/g, "1");
    const row = parseInt(bin.substr(0, 7), 2);
    const column = parseInt(bin.substr(7, 3), 2);
    const id = row * 8 + column;
    ids.push(id);
    console.log(b + " (" + bin + ") = row: " + row + ", column: " + column + ". Id: " + id);
}
ids.sort((a, b) => a - b);
for(let i = 0; i < ids.length; i++) {
    if(ids[i]+1 != ids[i+1]) return console.log(ids[i]+1);
}