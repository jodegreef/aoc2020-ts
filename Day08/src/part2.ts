import { access } from 'fs';
import { Instruction, Operation, RunnableInstruction } from './instruction';
import { readAllLinesFilterEmpty } from '@aoc2020/utils';

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
    let solution: {acc: number, looping: boolean} = {acc: 0, looping: true};

    let swapIndex = 0;
    do {
        let swapped = false;
        let variant = program.map((instruction, index) => {
            let newInstruction = new RunnableInstruction(instruction.operation, instruction.value);

            if (index == swapIndex) {
                if (newInstruction.operation === "nop") {
                    swapped = true;
                    newInstruction.operation = "jmp";
                } else if (instruction.operation === "jmp") {
                    swapped = true;
                    newInstruction.operation = "nop";
                }
            }
            return newInstruction;

        });
        swapIndex++;

        if (swapped)
            solution = subSolve(variant);

    } while (solution.looping) 

    return solution.acc;
}

const solveWithSpread = (program: RunnableInstruction[]) => {
    let solution: {acc: number, looping: boolean} = {acc: 0, looping: true};

    let swapIndex = 0;
    do {
        let variant = [...program]; // will not make a deep copy and will make the solution buggy!

        if (variant[swapIndex].operation == "jmp") {
            variant[swapIndex].operation = "nop";
            solution = subSolve(variant);
        } else if (variant[swapIndex].operation == "nop") {
            variant[swapIndex].operation = "jmp";
            solution = subSolve(variant);
        } 

        swapIndex++;

        //console.log("looping");
    } while (solution.looping) 

    return solution.acc;
}

const solveWithoutSpread = (program: RunnableInstruction[]) => {
    let solution: {acc: number, looping: boolean} = {acc: 0, looping: true};

    let swapIndex = 0;
    do {
        let variant = program.map(p => new RunnableInstruction(p.operation, p.value));

        if (variant[swapIndex].operation == "jmp") {
            variant[swapIndex].operation = "nop";
            solution = subSolve(variant);
        } else if (variant[swapIndex].operation == "nop") {
            variant[swapIndex].operation = "jmp";
            solution = subSolve(variant);
        } 

        swapIndex++;

    } while (solution.looping) 

    return solution.acc;
}



const subSolve = (program: RunnableInstruction[]) => {
    let acc: number = 0;
    let pi: number = 0;

    let visitedLines: number[] = [];

    let looping = false;

    do{
        if (program[pi] == undefined) {
            return {acc, looping: false};
        }

        let {acc: newAcc, pi: newPi} = program[pi].run(acc, pi);
        acc = newAcc;
        pi = newPi;
        if (visitedLines.filter(x => x == pi).length > 0) {
            looping = true;
        }
        visitedLines.push(pi);
    } while(!looping)


    return {acc, looping};

}

console.log("Part2a: " + solve(program));
console.log("Part2b: " + solveWithoutSpread(program));
console.log("Part2c (BUG): " + solveWithSpread(program));
