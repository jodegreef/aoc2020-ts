import { readAllLinesFilterEmpty } from '@aoc2020/utils';

let file= "input_test.txt";
file= "input.txt";

let lines = readAllLinesFilterEmpty("src/"+ file);


const solve = (lines: string[], x: number, y: number) => {
    console.log(`SOLVING ${x},${y}`);

    let positionX = 0;

    var trees = lines.filter((line, positionY) => {
        const isTree = (positionY % y == 0) && line.charAt(positionX) == "#";
        console.log(line);
        console.log(`${positionX} = ${isTree}  -- ${line.charAt(positionX)}`);
        positionX = (positionX + x) % (line.length-1); // moves X position and wraps around when end is reached
        return isTree;
    }).length;

    return trees;
}

console.log("Part1: " + solve(lines,3,1));
