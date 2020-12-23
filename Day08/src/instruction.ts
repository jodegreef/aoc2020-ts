export type Operation = "nop" | "acc" |"jmp"

export interface Instruction {
    operation: Operation;
    value: number;    
}

export class RunnableInstruction implements Instruction {
    constructor(public operation: Operation, public value: number) {
    }

    run(acc: number, pi: number): {acc: number, pi: number} {
        
        //console.log(`Run: ${this.operation} ${this.value}`);

        switch (this.operation) {
            case "nop":
              return {acc, pi: pi + 1};
            case "acc":
                return {acc: acc + this.value, pi: pi + 1};
            case "jmp":
                return {acc, pi: pi + this.value};
        }
    }
}

