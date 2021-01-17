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


    return playRound(1, player1, player2, []);

}

const alreadyPlayedThisRoundSlow = (player1: number[], player2: number[], previousRounds: number[][][]) => {
    for (let i = 0; i < previousRounds.length; i++) {
        const a  = previousRounds[i][0];
        const b  = previousRounds[i][1];
        // console.log(JSON.stringify(previousRounds));
        // console.log(JSON.stringify(player1));
        // console.log(JSON.stringify(player2));
        var alreadyplayed = (JSON.stringify(a)===JSON.stringify(player1)) ||  (JSON.stringify(b)===JSON.stringify(player2));
        if (alreadyplayed)
            return true;
    }
    return false;
}
const alreadyPlayedThisRound = (player1: number[], player2: number[], previousRounds: string[]) => {
        for (let i = 0; i < previousRounds.length; i++) {
        var alreadyplayed = (JSON.stringify(player1) + "-" + JSON.stringify(player2) === previousRounds[i]);
        if (alreadyplayed)
            return true;
    }
    return false;
}

const playRound = (level: number, player1: number[], player2: number[], previousRounds: string[]) => {
    debugLog("=== Game "+level+" ===");
    let round = 0;
    do {
        round++;
        debugLog("");
        debugLog(`-- Round ${round} (Game ${level}) --`);

        debugLog("Player 1's deck: " + player1);
        debugLog("Player 2's deck: " + player2);


        let winner = -1; // undetermined


        
        if (alreadyPlayedThisRound(player1, player2, previousRounds))
        {
            debugLog("already played this combo");
            return 1;  // player 1 wins
        } else {
            previousRounds.push(JSON.stringify(player1) + "-" + JSON.stringify(player2));
            let topCard1 = player1.splice(0,1)[0];
            let topCard2 = player2.splice(0,1)[0];

            debugLog("Player 1 plays: " + topCard1);
            debugLog("Player 2 plays: " + topCard2);
    

            if (player1.length >= topCard1 && player2.length >= topCard2) {
                debugLog("Playing a sub-game to determine the winner...");
                //determine winner by recursive
                let subdeck1 = [...player1].slice(0, topCard1);
                let subdeck2 = [...player2].slice(0, topCard2);

                winner = playRound(level+1, subdeck1, subdeck2, []);
                debugLog(`Player ${winner} wins round ${round} of game ${level}! (RECURSE)`);
            }
            else {
                winner = (topCard1 > topCard2) ? 1 : 2;
                debugLog(`Player ${winner} wins round ${round} of game ${level}! (HIGHEST CARD)`);
            }

            if (winner === 1) {
                player1.push(topCard1, topCard2);
  //              player1 = [...player1 , topCard1, topCard2];
            }
            else{
//                player2 = [...player2 , topCard2, topCard1];
                player2.push(topCard2, topCard1);
   
            }
        }
    } while (player1.length && player2.length)

    let winner = player1.length ? 1 : 2;
    let winnersDeck = player1.length ? player1 : player2;
    if (level === 1) {
        let score = winnersDeck.reverse().reduce((accumulator, current, idx) =>  accumulator+current*(idx+1));
        console.log("SCORE: " + score);
    }
    return winner;
}


//let debugLog = console.log;
let debugLog = (any) => {};

console.log("solution sample: " + solve("input_test.txt"));
console.log("solution: " + solve("input.txt"));
//console.log(alreadyPlayedThisRound([1,2], [3,4], ["[1,2]-[3,4]"]));



