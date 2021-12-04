fs = require('fs');
let [ rulesList, input ] = fs.readFileSync('example2.txt').toString().trimEnd().split("\n\n");

rulesList = rulesList.split("\n");
input = input.split("\n");

const rules = new Map();
for(let ruleRow of rulesList) {
    const [no, rule] = ruleRow.split(": ");
    rules.set(no, rule);
}
console.log(rules);

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

function getRuleSet(ruleNo) {
    let ruleSet = new Set();
    //console.log("Looking up rule no: " + ruleNo);
    let rule = rules.get(ruleNo);
    if(rule == undefined) rule = ruleNo;
    //if(rule.includes("\"")) return rule[1];
    if(rule.includes("\"")) ruleSet.add(rule[1]);
    else if(rule.includes("|")) {
        const split = rule.split("|").map(x => x.trim());
        ruleSet.add(...getRuleSet(split[0]));
        ruleSet.add(...getRuleSet(split[1]));
        //console.log("---");
        //ruleSet = union(getRuleSet(split[0]), getRuleSet(split[1]));
        //ruleSet.add(...getRuleSet(split[1]));
    } else if(rule.includes(" ")) {
        //console.log("Rule: " + rule);
        const combos = [];
        const parts = rule.split(" ").map(x => x.trim());
        for(let part of parts) {
            const res = getRuleSet(part);
            if(typeof(res) != "string") combos.push(...res);
            else combos.push(res);
        }
        //console.log("Combos: " + combos);
        //console.log(combos);
        let arr=[];
        for(let i of combos) {
            if(arr.length == 0) {
                console.log(rule + ": Creating new array with: " + i);
                if(typeof(i) == "string") arr.push(i);
                else arr.push(...i);
            }
            else if(typeof(i) == "string") {
                console.log("Adding string " + i + " to " + arr);
                arr = arr.map(x => x + i);
                console.log("Result: " + arr.join("|"));
            } else {
                //console.log("Adding set " + i + " to: ");
                //console.log(i);
                console.log(typeof(i));
                arr = i.flatMap(x => arr.map(y => y + x));
                console.log("Adding set result: " + arr.join("|"));  
            }
        }

        ruleSet = new Set(arr);
    }
    else {
        return getRuleSet(rule);
    } 
    console.log(ruleSet);
    return ruleSet;
}

const valid = getRuleSet("0");
let result = 0;
for(let message of input) {
    if(valid.has(message)) result++;
}

console.log(valid);
console.log(valid.size);
console.log("Result: " + result);