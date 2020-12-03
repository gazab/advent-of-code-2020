fs = require('fs');
var arr = fs.readFileSync('input.txt').toString().split("\n");

function getNumberOfTreesForSlope(xInc, yInc) {
    let x = 0;
    let trees = 0;
    
    for(var y = 0; y < arr.length; y+=yInc) {
        let row=arr[y];
        if(row[x % row.length] == "#") {
            trees++;
        }
        x += xInc;
    }
    
    console.log("Found " + trees + " trees for slope: " + xInc + ", " + yInc);
    return trees;
}

console.log( 
    getNumberOfTreesForSlope(1, 1) *
    getNumberOfTreesForSlope(3, 1) *
    getNumberOfTreesForSlope(5, 1) *
    getNumberOfTreesForSlope(7, 1) *
    getNumberOfTreesForSlope(1, 2)
);


