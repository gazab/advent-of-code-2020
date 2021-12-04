fs = require('fs');
let [ rulesList, input ] = fs.readFileSync('example.txt').toString().trimEnd().split("\n\n");

rulesList = rulesList.split("\n");
console.log(input);

const rules = new Map();
for(let ruleRow of rulesList) {
    const [no, rule] = ruleRow.split(": ");
    rules.set(no, rule);
}
console.log(rules);

for (let [key, value] of rules.entries()) {
    if(value.includes("\"")) {
        replaceRuleValue(key, value[1]);
    }
}

function replaceRuleValue(k, v) {
    console.log("Will replace " + k + " with " + v);
    for (let [key, value] of rules.entries()) {
        let parts = value.split(" ");
        for(let i = 0; i < parts.length; i++) {
            if(parts[i] == k) {
                parts[i] = v;
            }
        }
        rules.set(key, parts.join(" "));
    }
}

console.log(rules);
//console.log(getRuleSet("0"));