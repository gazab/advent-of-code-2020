fs = require('fs');
let [ rules, myTicket, tickets ] = fs.readFileSync('input.txt').toString().trimEnd().split("\n\n");

rules = rules.split("\n");
myTicket = myTicket.split("\n")[1].split(",");
tickets = tickets.split("\n").splice(1);

const ruleRegex = new RegExp(/(.+): (\d+)-(\d+) or (\d+)-(\d+)/);

const ruleMap = new Map();

for(let rule of rules) {
    const [_, name, fl, fu, sl, su ] = ruleMatch = rule.match(ruleRegex);
    const allowed = [];
    for(let i = Number.parseInt(fl); i <= Number.parseInt(fu); i++) allowed.push(i);
    for(let i = Number.parseInt(sl); i <= Number.parseInt(su); i++) allowed.push(i);
    ruleMap.set(name, allowed);
}

function getRulesForNumber(number) {
    const rules = new Set();
    for(let [name, allowed] of ruleMap.entries()) {
        if(allowed.includes(number)) rules.add(name);
    }
    return rules;
}


const invalidNumbers = [];
const validRulesPerColumn = new Map();
for(let ticket of tickets) {
    const ticketNumbers = ticket.split(",").map(x => Number.parseInt(x));
    for(let column = 0; column < ticketNumbers.length; column++) {
        const number = ticketNumbers[column];
        const validRules = getRulesForNumber(number);
        if(validRules.size == 0) break;
        set = validRulesPerColumn.get(column);
        if(set == undefined) {
            set = validRules;
            validRulesPerColumn.set(column, set);
        } else {
            let intersection = new Set([...validRules].filter(x => set.has(x)));
            validRulesPerColumn.set(column, intersection);
        }
    }
}

const correctColumnPerRule = new Map();
const columns = validRulesPerColumn.size; 
for(let i = 0; i < columns; i++) {
    let rule = undefined;
    let column = undefined;
    for(let [key, value] of validRulesPerColumn.entries()) {
        if(value.size == 1) {
            rule = value.values().next().value;
            column = key;
            break;
        }
        
    }
    validRulesPerColumn.delete(column);
    correctColumnPerRule.set(rule, column);
    removeRuleFromAllColumns(rule);
}

function removeRuleFromAllColumns(rule) {
    for(let [column, rules] of validRulesPerColumn.entries()) {
        rules.delete(rule);
    }
}

console.log(correctColumnPerRule);

let result = 1;
for(let [rule, column] of correctColumnPerRule.entries()) {
    if(rule.includes("departure")) {
        result *= myTicket[column];
    }
}
console.log(result);