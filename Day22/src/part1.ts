import { readAllLinesFilterEmpty } from '@aoc2020/utils';


const solve = (filename) => {
    
    let lines = readAllLinesFilterEmpty("src/"+ filename);

    let part1 = lines.splice(0, lines.length/2);
    //remove player names
    part1.shift();
    lines.shift();

    let player1 = part1.map(x => parseInt(x));
    let player2 = lines.map(x => parseInt(x));

    console.log(player1);
    console.log(player2);
    console.log("------");

    do {

    

        let top1 = player1.splice(0,1)[0];
        let top2 = player2.splice(0,1)[0];

        if (top1 > top2) {
            player1 = [...player1 , top1, top2];
        }
        else{
            player2 = [...player2 , top2, top1];

        }
        // console.log(player1);
        // console.log(player2);
        // console.log("------");

    } while (player1.length && player2.length)

    let winner = player1.length ? player1 : player2;

    let score = winner.reverse().reduce((accumulator, current, idx) =>  accumulator+current*(idx+1));
    console.log("SCORE: " + score);
    return score;
}




console.log("solution sample: " + solve("input_test.txt"));
console.log("solution: " + solve("input.txt"));



