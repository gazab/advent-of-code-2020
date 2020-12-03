fs = require('fs');
var arr = fs.readFileSync('input.txt').toString().split("\n");

let x = 0;
let trees = 0;
arr.forEach((row, y) => {
    console.log(x + ":" + y);
    if(row[x % row.length] == "#") {
        trees++;
    }
    x += 3;
});

console.log("Found " + trees + " trees");