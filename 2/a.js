fs = require('fs');
var arr = fs.readFileSync('input.txt').toString().split("\n");

const dataRegex = new RegExp(/(\d*)-(\d*) (\w): (.*)/);

let correct = 0;
let incorrect = 0;

arr.forEach(row => {
    const match = row.match(dataRegex);
    if(match != null) {
        let lower = Number.parseInt(match[1]);
        let upper = Number.parseInt(match[2]);
        let char = match[3];
        let password = match[4];
        
        let count = password.split(char).length-1;
        if(lower <= count && count <= upper) {
            correct++;
        } else {
            incorrect++;
        }
    }
});

console.log("Found " + correct + " correct passwords");
console.log("Found " + incorrect + " incorrect passwords");