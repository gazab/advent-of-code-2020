fs = require('fs');
const passports = fs.readFileSync('input.txt').toString().split("\n\n");
const reqKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

let count = 0;
passports.forEach(passport => {
    count += isValid(passport);
});


function isValid(passport) {
    for(let key of reqKeys) {
        if(!new RegExp(".*("+key+":\w*).*").test(passport)) {
            console.log(passport);
            console.log(key);
            return 0;
        }
    }

    return 1;
}

console.log(passports.length);
console.log(count);