import { ActionTable } from "./universal_machine";
export interface TuringMachine {
  initialState: string;
  stateList: string[];
  actionTable: ActionTable;
}

export const machineNameList = [
  "Copy 1s",
  "Repeat Binary",
  "Binary Palindlom",
  "Binary Increment",
  "Binary Addition",
  "3-State Busy Beaver",
  "4-State Busy Beaver",
] as const;

export type machines = typeof machineNameList[number];

export const copy1s: TuringMachine = {
  initialState: "each",
  stateList: ["each", "sep", "add", "sepL", "next", "done"],
  actionTable: [
    {
      inState: "each",
      reading: "0",
      move: ">",
      newState: "done",
    },
    {
      inState: "each",
      reading: "1",
      write: "0",
      move: ">",
      newState: "sep",
    },
    {
      inState: "sep",
      reading: "0",
      move: ">",
      newState: "add",
    },
    {
      inState: "sep",
      reading: "1",
      move: ">",
    },
    {
      inState: "add",
      reading: "0",
      write: "1",
      move: "<",
      newState: "sepL",
    },
    {
      inState: "add",
      reading: "1",
      move: ">",
    },
    {
      inState: "sepL",
      reading: "0",
      move: "<",
      newState: "next",
    },
    {
      inState: "sepL",
      reading: "1",
      move: "<",
    },
    {
      inState: "next",
      reading: "0",
      write: "1",
      move: ">",
      newState: "each",
    },
    {
      inState: "next",
      reading: "1",
      move: "<",
    },
  ],
};
export const repeatBinary: TuringMachine = {
  initialState: "a",
  stateList: ["a", "b"],
  actionTable: [
    {
      inState: "a",
      reading: "",
      write: "0",
      move: ">",
      newState: "b",
    },
    {
      inState: "b",
      reading: "",
      write: "1",
      move: ">",
      newState: "a",
    },
  ],
};
export const binaryPalindlom: TuringMachine = {
  initialState: "start",
  stateList: [
    "start",
    "haveZero",
    "haveOne",
    "matchZero",
    "matchOne",
    "back",
    "true",
    "false",
  ],
  actionTable: [
    {
      inState: "start",
      reading: "0",
      write: "",
      move: ">",
      newState: "haveZero",
    },
    {
      inState: "start",
      reading: "1",
      write: "",
      move: ">",
      newState: "haveOne",
    },
    {
      inState: "start",
      reading: "",
      newState: "true",
      comment: "empty string",
    },
    {
      inState: "haveZero",
      reading: "0",
      move: ">",
    },
    {
      inState: "haveZero",
      reading: "1",
      move: ">",
    },
    {
      inState: "haveZero",
      reading: "",
      move: "<",
      newState: "matchZero",
    },
    {
      inState: "haveOne",
      reading: "0",
      move: ">",
    },
    {
      inState: "haveOne",
      reading: "1",
      move: ">",
    },
    {
      inState: "haveOne",
      reading: "",
      move: "<",
      newState: "matchOne",
    },
    {
      inState: "matchZero",
      reading: "0",
      write: "",
      move: "<",
      newState: "back",
      comment: "same symbol at both ends",
    },
    {
      inState: "matchZero",
      reading: "1",
      newState: "false",
    },
    {
      inState: "matchZero",
      reading: "",
      newState: "true",
      comment: "single symbol",
    },
    {
      inState: "matchOne",
      reading: "0",
      newState: "false",
    },
    {
      inState: "matchOne",
      reading: "1",
      write: "",
      move: "<",
      newState: "back",
      comment: "same symbol at both ends",
    },
    {
      inState: "matchOne",
      reading: "",
      newState: "true",
      comment: "single symbol",
    },
    {
      inState: "back",
      reading: "0",
      move: "<",
    },
    {
      inState: "back",
      reading: "1",
      move: "<",
    },
    {
      inState: "back",
      reading: "",
      move: ">",
      newState: "start",
    },
  ],
};
export const binaryIncrement: TuringMachine = {
  initialState: "right",
  stateList: ["right", "carry", "done"],
  actionTable: [
    {
      inState: "right",
      reading: "1",
      move: ">",
    },
    {
      inState: "right",
      reading: "0",
      move: ">",
    },
    {
      inState: "right",
      reading: "",
      move: "<",
      newState: "carry",
    },
    {
      inState: "carry",
      reading: "1",
      write: "0",
      move: "<",
    },
    {
      inState: "carry",
      reading: "0",
      write: "1",
      move: "<",
      newState: "done",
    },
  ],
};
export const binaryAddition: TuringMachine = {
  initialState: "right",
  stateList: [
    "right",
    "read",
    "have0",
    "have1",
    "add0",
    "add1",
    "carry",
    "back0",
    "back1",
    "rewrite",
    "done",
  ],
  actionTable: [
    {
      inState: "right",
      reading: "0",
      move: ">",
    },
    {
      inState: "right",
      reading: "1",
      move: ">",
    },
    {
      inState: "right",
      reading: "+",
      move: ">",
    },
    {
      inState: "right",
      reading: "",
      move: "<",
      newState: "read",
    },

    {
      inState: "read",
      reading: "0",
      write: "c",
      move: "<",
      newState: "have0",
    },
    {
      inState: "read",
      reading: "1",
      write: "c",
      move: "<",
      newState: "have1",
    },
    {
      inState: "read",
      reading: "+",
      write: "",
      move: "<",
      newState: "rewrite",
    },

    {
      inState: "have0",
      reading: "0",
      move: "<",
    },
    {
      inState: "have0",
      reading: "1",
      move: "<",
    },
    {
      inState: "have0",
      reading: "+",
      move: "<",
      newState: "add0",
    },

    {
      inState: "have1",
      reading: "0",
      move: "<",
    },
    {
      inState: "have1",
      reading: "1",
      move: "<",
    },
    {
      inState: "have1",
      reading: "+",
      move: "<",
      newState: "add1",
    },

    {
      inState: "add0",
      reading: "0",
      write: "O",
      move: ">",
      newState: "back0",
    },
    {
      inState: "add0",
      reading: "",
      write: "O",
      move: ">",
      newState: "back0",
    },
    {
      inState: "add0",
      reading: "1",
      write: "I",
      move: ">",
      newState: "back0",
    },
    {
      inState: "add0",
      reading: "O",
      move: "<",
    },
    {
      inState: "add0",
      reading: "I",
      move: "<",
    },

    {
      inState: "add1",
      reading: "0",
      write: "I",
      move: ">",
      newState: "back1",
    },
    {
      inState: "add1",
      reading: "",
      write: "I",
      move: ">",
      newState: "back1",
    },
    {
      inState: "add1",
      reading: "1",
      write: "O",
      move: "<",
      newState: "carry",
    },
    {
      inState: "add1",
      reading: "O",
      move: "<",
    },
    {
      inState: "add1",
      reading: "I",
      move: "<",
    },

    {
      inState: "carry",
      reading: "0",
      write: "1",
      move: ">",
      newState: "back1",
    },
    {
      inState: "carry",
      reading: "",
      write: "1",
      move: ">",
      newState: "back1",
    },
    {
      inState: "carry",
      reading: "1",
      write: "0",
      move: "<",
    },

    {
      inState: "back0",
      reading: "0",
      move: ">",
    },
    {
      inState: "back0",
      reading: "1",
      move: ">",
    },
    {
      inState: "back0",
      reading: "O",
      move: ">",
    },
    {
      inState: "back0",
      reading: "I",
      move: ">",
    },
    {
      inState: "back0",
      reading: "+",
      move: ">",
    },
    {
      inState: "back0",
      reading: "c",
      write: "0",
      move: "<",
      newState: "read",
    },

    {
      inState: "back1",
      reading: "0",
      move: ">",
    },
    {
      inState: "back1",
      reading: "1",
      move: ">",
    },
    {
      inState: "back1",
      reading: "O",
      move: ">",
    },
    {
      inState: "back1",
      reading: "I",
      move: ">",
    },
    {
      inState: "back1",
      reading: "+",
      move: ">",
    },
    {
      inState: "back1",
      reading: "c",
      write: "1",
      move: "<",
      newState: "read",
    },

    {
      inState: "rewrite",
      reading: "O",
      write: "0",
      move: "<",
    },
    {
      inState: "rewrite",
      reading: "I",
      write: "1",
      move: "<",
    },
    {
      inState: "rewrite",
      reading: "0",
      move: "<",
    },
    {
      inState: "rewrite",
      reading: "1",
      move: "<",
    },
    {
      inState: "rewrite",
      reading: "",
      move: ">",
      newState: "done",
    },
  ],
};
export const thirdBusyBeaver: TuringMachine = {
  initialState: "A",
  stateList: ["A", "B", "C", "done"],
  actionTable: [
    {
      inState: "A",
      reading: "0",
      write: "1",
      move: ">",
      newState: "B",
    },
    {
      inState: "A",
      reading: "1",
      move: "<",
      newState: "C",
    },
    {
      inState: "B",
      reading: "0",
      write: "1",
      move: "<",
      newState: "A",
    },
    {
      inState: "B",
      reading: "1",
      move: ">",
    },
    {
      inState: "C",
      reading: "0",
      write: "1",
      move: "<",
      newState: "B",
    },
    {
      inState: "C",
      reading: "1",
      move: ">",
      newState: "done",
    },
  ],
};
export const fourthBusyBeaver: TuringMachine = {
  initialState: "A",
  stateList: ["A", "B", "C", "D", "done"],
  actionTable: [
    {
      inState: "A",
      reading: "0",
      write: "1",
      move: ">",
      newState: "B",
    },
    {
      inState: "A",
      reading: "1",
      move: "<",
      newState: "B",
    },
    {
      inState: "B",
      reading: "0",
      write: "1",
      move: "<",
      newState: "A",
    },
    {
      inState: "B",
      reading: "1",
      write: "0",
      move: "<",
      newState: "C",
    },
    {
      inState: "C",
      reading: "0",
      write: "1",
      move: ">",
      newState: "done",
    },
    {
      inState: "C",
      reading: "1",
      move: "<",
      newState: "D",
    },
    {
      inState: "D",
      reading: "0",
      write: "1",
      move: ">",
    },
    {
      inState: "D",
      reading: "1",
      write: "0",
      move: ">",
      newState: "A",
    },
  ],
};
