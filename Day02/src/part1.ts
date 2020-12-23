import { readAllLinesFilterEmpty } from '@aoc2020/utils';

let file= "input_test.txt";
file= "input.txt";

let lines = readAllLinesFilterEmpty("src/"+ file);

console.log("INPUT:")
lines.forEach(x => console.log(x));
console.log("-----");


let regex = /([0-9]*)-([0-9]*) ([a-z]): ([a-z]*)/;


var sum = 0;
lines.forEach((line) => {
    var matches =line.match(regex);
    console.log(line);
    //console.log(matches);
    const min = parseInt(matches![1]);
    const max = parseInt(matches![2]);
    const char = matches && matches[3];
    const toTest: any = matches && matches[4];

    var occurences = [...toTest].filter(c => c == char).length;

    if (occurences >= min && occurences <= max){
        sum++;
    }



})
console.log(sum);


// const solve = (lines: number[]) => {
//   for(let i = 0; i < lines.length; i++) {
//     for(let j = i+1; j < lines.length; j++) {
//       if (lines[i] + lines[j] == 2020) {
//         return lines[i]*lines[j];
//       }
//     }
//   };
// }


// console.log(solve(lines));
