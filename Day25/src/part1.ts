import { readAllLinesFilterEmpty } from  '@aoc2020/utils';



const solve = (targetPublicKey: number, subjectNumber: number): number => {
    let loopSize: number = 0;
    let publicKey = 1;
    while(publicKey != targetPublicKey) {
        loopSize++;
        publicKey = transform(publicKey, subjectNumber);
    }

    return loopSize;
}

const solveWithLoopSize = (subjectNumber: number, loopSize: number): number => {
    let publicKey = 1;
    for(let i = 0; i< loopSize; i++) {
        publicKey = transform(publicKey, subjectNumber);
    }

    return publicKey;
}

const transform = (someValue : number, subject: number) : number => {
    let transformed = someValue * subject;
    transformed = transformed % 20201227
    return transformed;
}

// Example:
// const cardKey = 5764801;
// const doorKey = 17807724;


const cardKey = 14205034;
const doorKey = 18047856;


const loopSizeCard = solve(cardKey, 7);
const loopSizeDoor = solve(doorKey, 7);

console.log("loopsize card: " + loopSizeCard);
console.log("loopsize door: " + loopSizeDoor);

console.log("encryptionKey: " + solveWithLoopSize(doorKey, loopSizeCard));



