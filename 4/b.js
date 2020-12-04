fs = require('fs');
const passports = fs.readFileSync('input.txt').toString().split("\n\n");
const reqKeys = [
    {key: "byr", pattern: "19[2-9][0-9]|20[0-2]" },
    {key: "iyr", pattern: "201[0-9]|2020" },
    {key: "eyr", pattern: "202[0-9]|2030" },
    {key: "hgt", pattern: "(((1[5-8][0-9]|19[0-2])cm)|([5-6][0-9]|7[0-6])in)" },
    {key: "hcl", pattern: "#([0-9]|[a-f]){6}" },
    {key: "ecl", pattern: "amb|blu|brn|gry|grn|hzl|oth" },
    {key: "pid", pattern: "\\d{9}" }
]

let count = 0;
passports.forEach(passport => {
    count += isValid(passport);
});

function isValid(passport) {
    for(let rules of reqKeys) {
        if(!new RegExp(".*"+rules.key+":("+rules.pattern+")").test(passport)) {
            return 0;
        }
    }

    return 1;
}

console.log(passports.length);
console.log(count);