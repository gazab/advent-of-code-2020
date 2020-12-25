fs = require('fs');
let [ player1, player2 ] = fs.readFileSync('input.txt').toString().trimEnd().split("\n\n");

player1 = player1.split("\n").splice(1).map(x => Number.parseInt(x));
player2 = player2.split("\n").splice(1).map(x => Number.parseInt(x));

const [winner, p1, p2] = play(clone(player1), clone(player2), 1);
player1 = p1;
player2 = p2;

function log(string) {
    //console.log(string);
}

function play(p1, p2, game) {
    const gameLog = new Set();
    log(`=== Game ${game} ===`)
    log("");
    let round = 1;
    while(p1.length != 0 && p2.length != 0) {
        let winner = undefined;
        // Recursive loop rule
        var logEntry = JSON.stringify([p1, p2]); 
        if(gameLog.has(logEntry)) {
            log("Recursive fail safe!");
            return ["Player 1", p1, p2];
        } else {
            gameLog.add(logEntry);
        }
        
        log(`-- Round ${round} (Game ${game}) --`);
        log("Player 1's deck: " + p1.join(", "));
        log("Player 2's deck: " + p2.join(", "));
        let c1 = p1.shift();
        let c2 = p2.shift();
        log("Player 1 plays: " + c1);
        log("Player 2 plays: " + c2);


        if(p1.length >= c1 && p2.length >= c2) {
            log("Playing a sub-game to determine the winner...");
            log("");
            winner = play(clone(p1.slice(0, c1)), clone(p2.slice(0, c2)), game + 1)[0];
            log("Recursive game winner: " + winner);
        }
        
        if((winner == undefined && c1 > c2) || winner == "Player 1") {
            log("Player 1 wins round " + round + " of game " + game)
            p1.push(c1, c2);
        } else if((winner == undefined && c2 > c1) || winner == "Player 2") {
            log("Player 2 wins round " + round + " of game " + game)
            p2.push(c2, c1);
        }
        round++;
        log("");
    }
    return [p1.length == 0 ? "Player 2" : "Player 1", p1, p2];
}

function clone(arr) {
    return JSON.parse(JSON.stringify(arr))
}

console.log("== Post game results ==");
console.log(winner + " won!");
console.log("Player 1's deck: " + player1.join(", "));
console.log("Player 2's deck: " + player2.join(", "));
const winnerDeck = winner == "Player 1" ? player1 : player2;
const result = winnerDeck.reverse().reduce((acc, cur, index) => acc + (cur * (index + 1)));
console.log(result);
