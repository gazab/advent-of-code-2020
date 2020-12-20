fs = require('fs');
let array = fs.readFileSync('input.txt').toString().trimEnd().split("\n");

const maskRegex = new RegExp(/mask = (.*)/);
const memRegex = new RegExp(/mem\[(\d+)\] = (\d+)/);

var setMask = 0;
var clearMask = 0
var mem = new Map();

var masks = [];

for(let row of array) {
    const maskMatch = row.match(maskRegex);
    if(maskMatch != null) {
        newMask = maskMatch[1];
        masks = getFloatingMasks(newMask);
    } else {
        const [_, rawAddress, rawValue] = row.match(memRegex);
        value = BigInt(rawValue);
        
        for(let mask of masks) {
            address = BigInt(rawAddress);
            clearMask = BigInt("0b"+mask.replace(/o/g, "0").replace(/1/g, "0").replace(/z/g, 1), 2);
            setMask = BigInt("0b"+mask.replace(/z/g, "0").replace(/0/g, "0").replace(/o/g, 1), 2);
            let newAddress = (address | setMask ) & ~clearMask;
            mem.set(newAddress, value);
        }

    }
}

function getFloatingMasks(mask) {
    let size = 0;
    const indices = [];
    const bits = mask.matchAll((/X/g));
    
    for(match of bits) {
        size++;
        indices.push(match.index);
    }

    const masks = [];
    const maskArray = mask.split("");

    for(let i = 0; i < Math.pow(2, size); i++) {
        const binString = i.toString(2);
        for(let j = 0; j < indices.length; j++) {
            const loc = binString.length-1-j;
            const replacement = binString[loc] == undefined ? "z" : binString[loc] == "0" ? "z" : "o";
            const indexToReplace = indices[indices.length-1-j];
            maskArray[indexToReplace] = replacement;
        }
        masks.push(maskArray.join(""));
    }
    return masks;
}

let result = 0n;
for(let val of mem.values()) {
    result += val;
}
console.log(result);