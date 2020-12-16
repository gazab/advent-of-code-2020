fs = require('fs');
let [ time, buses ] = fs.readFileSync('example.txt').toString().trimEnd().split("\n");

time = Number.parseInt(time);
buses = buses.split(",").filter(x => x != "x").map(x => Number.parseInt(x)).sort((a, b) => a - b);

var lastDeparture = new Map();
buses.forEach((bus) => lastDeparture.set(bus,0));

let currentTime = 0;
while(Array.from(lastDeparture.values()).every(x => x < time)) {
    for(let bus of lastDeparture.keys()) {
        if(currentTime % bus == 0) lastDeparture.set(bus, currentTime); 
    };
    currentTime++;
}

console.log(lastDeparture);
const chosenBus = Array.from(lastDeparture.entries()).filter(x => x[1] >= time)[0];
console.log(chosenBus);
console.log("Result: " + chosenBus[0] * (chosenBus[1]-time));