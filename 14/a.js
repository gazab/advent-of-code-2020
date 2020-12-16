fs = require('fs');
let array = fs.readFileSync('input.txt').toString().trimEnd().split("\n");

const maskRegex = new RegExp(/mask = (.*)/);
const memRegex = new RegExp(/mem\[(\d+)\] = (\d+)/);

var setMask = 0;
var clearMask = 0
var mem = new Map();

for(let row of array) {
    const maskMatch = row.match(maskRegex);
    if(maskMatch != null) {
        newMask = maskMatch[1];
        clearMask = BigInt("0b"+newMask.replace(/1/g, "X").replace(/0/g, 1).replace(/X/g, "0"), 2);
        setMask = BigInt("0b"+newMask.replace(/0/g, "X").replace(/X/g, "0"), 2);
        console.log(clearMask);
        console.log(setMask);
    } else {
        const [_, address, rawValue] = row.match(memRegex);
        value = BigInt(rawValue);
        let newValue = (value | setMask ) & ~clearMask;
        mem.set(address, newValue);
    }
}

console.log(mem);
let result = 0n;
for(let val of mem.values()) {
    result += val;
}
console.log(result);