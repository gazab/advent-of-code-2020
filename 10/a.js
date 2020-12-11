fs = require('fs');
let input = fs.readFileSync('example1.txt').toString().trimEnd().split("\n").map(x => Number.parseInt(x));

input.push(0); // Add jack
input = input.sort((a, b) => a - b);
input.push(input[input.length-1]+3); // Add device

const dist = new Map();
for(let i = 0; i < input.length - 1; i++) {
    let diff = input[i+1] - input[i];
    dist.set(diff, !dist.has(diff) ? 1 : dist.get(diff) + 1);
    //console.log(diff);
}
console.log(dist);
console.log(dist.get(1)*dist.get(3));