fs = require('fs');
let [ time, buses ] = fs.readFileSync('example3.txt').toString().trimEnd().split("\n");

time = Number.parseInt(time);
buses = buses.split(",");

console.log(buses);

var lastDeparture = new Map();
buses.filter(x => x != "x").forEach((bus) => lastDeparture.set(Number.parseInt(bus),0));


console.log(lastDeparture);
currentTime = 0;

const temp = Array.from(lastDeparture.entries())
//console.log(temp);
//console.log(buses.indexOf(temp[2][0]));
const gaps = [];
for(let bus of buses) {
    if(bus != "x") {
        gaps.push(buses.indexOf(bus));
    }
}
console.log(gaps);

let times = 2;

while(!finished()) {
    // for(let bus of lastDeparture.keys()) {
    //     if(currentTime % bus == 0) {
    //         lastDeparture.set(bus, currentTime); 
    //     }  
    // };
    //currentTime += buses[0];
    currentTime++;
}

function finished() {
    const startTime = currentTime;
    return Array.from(lastDeparture.entries()).every(x => startTime + buses.indexOf(x[0].toString()) % x[0] == 0);
}

console.log("Result: " + lastDeparture.get(Number.parseInt(buses[0])));

//console.log(lastDeparture);
// const chosenBus = Array.from(lastDeparture.entries()).filter(x => x[1] >= time)[0];
// console.log(chosenBus);
// console.log("Result: " + chosenBus[0] * (chosenBus[1]-time));