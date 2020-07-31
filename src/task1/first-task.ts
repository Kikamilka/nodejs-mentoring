import readline from 'readline';
import { reversedString } from "./utils/string-reverser";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

export function firstTaskStarter () {
    console.log('You can write any string and tap enter:');
    rl.on('line', function(line: string){
        const reverseLine = reversedString(line);
        console.log(reverseLine);
        console.log('\n');
    });
}

firstTaskStarter();
