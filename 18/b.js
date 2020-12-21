fs = require('fs');
let rows = fs.readFileSync('input.txt').toString().trimEnd().split("\n");
const subRegex = new RegExp(/\(([^)(]+)\)/gm);
const plusRegex = new RegExp(/\d+ \+ \d+( \+ \d+)*/gm);

let sum = 0;
for(let row of rows) {
    const answer = calc(row);
    //console.log(row + " = " + answer);
    sum += answer;
}

function calc(input) {
   input = input.replace(subRegex, (_, sub) => {
       return calc(sub);
   });
   
   input = input.replace(plusRegex, (match) => {
    return eval(match);
    })

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

console.log("Sum: " + sum);