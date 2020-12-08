fs = require('fs');
const rules = fs.readFileSync('input.txt').toString().trimEnd().split("\n");
const colorRegex = new RegExp(/(.*) bags contain/);
const contentRegex = new RegExp(/(\d+) (.*?) bag/g);

const bags = new Map();

for(let rule of rules) {
    const parsedRule = parseRule(rule);
    bags.set(parsedRule.color, parsedRule.content);
}

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
let result = 0;
let searchSet = [];
searchSet.push("shiny gold");
console.log(searchSet);
while(searchSet.length != 0) {
    const tempSet = [];
    for(const val of searchSet) {
        const content = bags.get(val);
        if(content != undefined) {
            //console.log(val + " had " + content.length + " other bags");
            result += content.length;
            for(let bag of content) {
                tempSet.push(bag);
            }
        }
    }
    searchSet = tempSet;
}

console.log(result);