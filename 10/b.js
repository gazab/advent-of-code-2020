const { SIGBREAK } = require('constants');

fs = require('fs');
let input = fs.readFileSync('example1.txt').toString().trimEnd().split("\n").map(x => Number.parseInt(x));

input.push(0); // Add jack
input = input.sort((a, b) => a - b);
input.push(input[input.length-1]+3); // Add device

console.log(input);

let combs = 1;
const dist = new Map();
const ways = new Set();
let skippable = 0;
let groups = 0;
let perms = 1;
for(let i = 0; i < input.length - 1; i++) {
    let times = 0;
    const subSet = new Set();
    for(let j = 1; j <= 3; j++) {
        if(input[i+j]) {
            let diff = input[i+j] - input[i];
            let diff2 = input[i+j+1] - input[i]
            if(diff == 1 && diff2 == 2) {
                console.log(input[i+j] + " can be skipped");
                skippable++;
            }
            //console.log(input[i] + " -> " + input[i+j] + " - " + diff + (diff <= 3 ? " *" : ""));
            if(diff <= 3) {
                subSet.add(input[i+j]);
                ways.add([input[i], input[i+j]]);
                //ways.add(input[i+j]);
                dist.set(diff, !dist.has(diff) ? 1 : dist.get(diff) + 1);
                //console.log(diff);
                times++;
            }
        }
    }
    console.log(subSet);
    if(subSet.size > 1) i += subSet.size-1;
    //console.log("Times for " + input[i] + ": " + times);
    combs *= times;
    groups++;
    perms *= subSet.size;
}

function fact(i) {
    if(i == 0) return 1;
    else return i * fact(--i);
}




//console.log(dist);
//console.log(dist.get(1)*dist.get(3));
//console.log(combs);
//console.log(combs2);
console.log(groups);
console.log(dist.get(1)*dist.get(3));
console.log(ways.size);
console.log(perms);
console.log("Result: " + Math.pow(2,skippable));
console.log("Result: " + Math.pow(2, ways.size) / Math.pow(2,input.length));
console.log("Result: " + Math.pow(2, ways.size) / Math.pow(2,groups));
console.log("Result: " + Math.pow(2, groups) / Math.pow(2,skippable));
console.log("Result: " + fact(groups) / fact(skippable));
console.log("Result: " + fact(groups) / fact(perms));
console.log("Result: " + fact(perms) / fact(skippable));
console.log("Result: " + Math.pow(2, groups) / Math.pow(2, perms));

/*
(0), 1, 4, 5, 6, 7, (10)
(0), 1, 4, 5, 7, (10)
(0), 1, 4, 6, 7, (10)
(0), 1, 4, 7, (10)
*/

/*
(0), 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4, 5, 6, 7, 10,     12, 15, 16, 19, (22)
(0), 1, 4, 5,    7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4, 5,    7, 10,     12, 15, 16, 19, (22)
(0), 1, 4,    6, 7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4,    6, 7, 10,     12, 15, 16, 19, (22)
(0), 1, 4,       7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4,       7, 10,     12, 15, 16, 19, (22)
*/

/*
(0), 1, 4, 5, 6, 7, 10, 11, 12, 15,     17, 19, (22)
(0), 1, 4, 5, 6, 7, 10,     12, 15,     17, 19, (22)
(0), 1, 4, 5,    7, 10, 11, 12, 15,     17, 19, (22)
(0), 1, 4, 5,    7, 10,     12, 15,     17, 19, (22)
(0), 1, 4,    6, 7, 10, 11, 12, 15,     17, 19, (22)
(0), 1, 4,    6, 7, 10,     12, 15,     17, 19, (22)
(0), 1, 4,       7, 10, 11, 12, 15,     17, 19, (22)
(0), 1, 4,       7, 10,     12, 15,     17, 19, (22)
(0), 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 17, 19, (22)
(0), 1, 4, 5, 6, 7, 10,     12, 15, 16, 17, 19, (22)
(0), 1, 4, 5,    7, 10, 11, 12, 15, 16, 17, 19, (22)
(0), 1, 4, 5,    7, 10,     12, 15, 16, 17, 19, (22)
(0), 1, 4,    6, 7, 10, 11, 12, 15, 16, 17, 19, (22)
(0), 1, 4,    6, 7, 10,     12, 15, 16, 17, 19, (22)
(0), 1, 4,       7, 10, 11, 12, 15, 16, 17, 19, (22)
(0), 1, 4,       7, 10,     12, 15, 16, 17, 19, (22)
*/