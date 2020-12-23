import { readAllLinesFilterEmpty } from '@aoc2020/utils';

let file= "input_test.txt";
file= "input.txt";

let lines = readAllLinesFilterEmpty("src/"+ file).map(x => parseInt(x));

console.log("INPUT:")
lines.forEach(x => console.log(x));
console.log("-----");

const solve = (lines: number[]) => {
  for(let i = 0; i < lines.length; i++) {
    for(let j = i+1; j < lines.length; j++) {
      if (lines[i] + lines[j] == 2020) {
        return lines[i]*lines[j];
      }
    }
  };
}


console.log(solve(lines));
