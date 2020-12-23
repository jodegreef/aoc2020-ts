import { Operation, RunnableInstruction } from './instruction';
import { readAllLinesFilterEmpty } from  '@aoc2020/utils';

let file= "input_test.txt";
file= "input.txt";

let lines = readAllLinesFilterEmpty("src/"+ file);

let program = lines.map((line) => {
    const split = line.split(" ");
    // return <Instruction> {
    //     operation: split[0],
    //     value: parseInt(split[1])
    // } 
    return new RunnableInstruction(
        <Operation> split[0],
        parseInt(split[1])
    );
});

const solve = (program: RunnableInstruction[]) => {
    let acc: number = 0;
    let pi: number = 0;

    let visitedLines: number[] = [];

    let looping = false;

    do{
        let {acc: newAcc, pi: newPi} = program[pi].run(acc, pi);
        acc = newAcc;
        pi = newPi;
        if (visitedLines.filter(x => x == pi).length > 0) {
            looping = true;
        }
        visitedLines.push(pi);
    } while(!looping)

    return acc;
}

console.log("Part1: " + solve(program));
