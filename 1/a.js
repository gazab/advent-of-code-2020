fs = require('fs');

var arr = fs.readFileSync('input.txt').toString().split("\n").map(line => Number.parseInt(line));

arr.forEach(x => {
    arr.forEach(y => {
        if(x+y == 2020) {
            console.log(x*y);
            process.exit(0);
        }
    });
});