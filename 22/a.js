fs = require('fs');
let [ player1, player2 ] = fs.readFileSync('input.txt').toString().trimEnd().split("\n\n");

player1 = player1.split("\n").splice(1).map(x => Number.parseInt(x));
player2 = player2.split("\n").splice(1).map(x => Number.parseInt(x));

while(player1.length != 0 && player2.length != 0) {
    let c1 = player1.shift();
    let c2 = player2.shift();
    if(c1 > c2) {
        player1.push(c1, c2);
    } else if(c2 > c1) {
        player2.push(c2, c1);
    }
}

console.log(player1);
console.log(player2);

const winner = player1.length == 0 ? player2 : player1;
const result = winner.reverse().reduce((acc, cur, index) => acc + (cur * (index + 1)));
console.log(result);

