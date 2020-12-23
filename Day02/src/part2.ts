import { readAllLinesFilterEmpty } from '@aoc2020/utils';

let file= "input_test.txt";
file= "input.txt";

let lines = readAllLinesFilterEmpty("src/"+ file);

console.log("INPUT:")
lines.forEach(x => console.log(x));
console.log("-----");


let regex = /([0-9]*)-([0-9]*) ([a-z]): ([a-z]*)/;


// var sum = 0;
// lines.forEach((line) => {
//     var matches =line.match(regex);
//     console.log(line);
//     const pos1 = parseInt(matches![1])-1;
//     const pos2 = parseInt(matches![2])-1;
//     const char = matches && matches[3];
//     const toTest = [...(<any> matches![4])];

//     var ok = (toTest[pos1] == char || toTest[pos2] == char) && !(toTest[pos1] == char && toTest[pos2]==char);

//     if (ok){
//         console.log("ok");
//         sum++;
//     }
// })

var sum = lines.reduce((total: number, line) => {
    var matches =line.match(regex);
    console.log(line);
    const pos1 = parseInt(matches![1])-1;
    const pos2 = parseInt(matches![2])-1;
    const char = matches && matches[3];
    const toTest = [...(<any> matches![4])];

    var ok = (toTest[pos1] == char || toTest[pos2] == char) && !(toTest[pos1] == char && toTest[pos2]==char);

    if (ok){
        console.log("ok");
        total++;
    }

    return total;
    
}, 0)

console.log(sum);
