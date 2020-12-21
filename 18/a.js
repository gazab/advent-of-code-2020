fs = require('fs');
let rows = fs.readFileSync('input.txt').toString().trimEnd().split("\n");
const subRegex = new RegExp(/\(([^)(]+)\)/gm);

let sum = 0;
for(let row of rows) {
    sum += calc(row);
}

function calc(input) {
   input = input.replace(subRegex, (_, sub) => {
       //console.log(sub);
       return calc(sub);
   });

   if(input.includes("(")) input = calc(input);
   if(Number.isInteger(input)) return input;

    let val = 0;
    let operator = "+";
    stack = input.split(" ");
    for(let element of stack) {
        if(element == "+" || element == "*") {
            operator = element;
        } else {
            val = eval(val + operator + element);
        }
    }

   return val;
}

console.log(sum);