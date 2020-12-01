fs = require('fs');
var arr = fs.readFileSync('input.txt').toString().split("\n").map(line => Number.parseInt(line));

arr.forEach(x => {
    arr.forEach(y => {
        arr.forEach(z => {
            if(x+y+z == 2020) {
                console.log(x*y*z);
                process.exit(0);
            } 
        });
    });
});