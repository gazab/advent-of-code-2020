fs = require('fs');
const rules = fs.readFileSync('input.txt').toString().trimEnd().split("\n");
const colorRegex = new RegExp(/(.*) bags contain/);
const contentRegex = new RegExp(/(\d+) (.*?) bag/g);

const bags = new Map();

for(let rule of rules) {
    const parsedRule = parseRule(rule);
    bags.set(parsedRule.color, parsedRule.content);
}

console.log(bags);
console.log(bags.size + " total bags.");

function parseRule(rule) {
    const colorMatch = rule.match(colorRegex);
    const bag = { color: colorMatch[1], content: [] };
    const contentMatch = rule.match(contentRegex);
    while(matches = contentRegex.exec(rule)) {
        const count = Number.parseInt(matches[1]);
        const color = matches[2];
        for(let i = 0; i < count; i++)
            bag.content.push(color);
    }
    return bag;
}

// Create initial set
const result = new Set();
let searchSet = new Set();
searchSet.add("shiny gold");
console.log(searchSet);
while(searchSet.size != 0) {
    const tempSet = new Set();
    for(const val of searchSet.values()) {
        console.log("Searching for bags that contain '" + val + "'");
        for(const [key, value] of bags.entries()) {
            if (value.includes(val)) {
                result.add(key);
                tempSet.add(key);
            }
        }        
    }
    searchSet = tempSet;
}

console.log(result);
console.log(result.size);