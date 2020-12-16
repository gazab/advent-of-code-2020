fs = require('fs');
let [ rules, myTicket, tickets ] = fs.readFileSync('example.txt').toString().trimEnd().split("\n\n");

rules = rules.split("\n");
myTicket = myTicket.split("\n")[1];
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
    const rules = [];
    for(let [name, allowed] of ruleMap.entries()) {
        if(allowed.includes(number)) rules.push(name);
    }
    return rules;
}


const invalidNumbers = [];
for(let ticket of tickets) {
    const ticketNumbers = ticket.split(",").map(x => Number.parseInt(x));
    for(let number of ticketNumbers) {
        if(getRulesForNumber(number).length == 0) invalidNumbers.push(number);
    }
}

console.log(invalidNumbers.reduce((a, b) => a + b, 0));

//console.log(rules);
//console.log(myTicket);
//console.log(tickets);
