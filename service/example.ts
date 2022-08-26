import { ActionTable } from "./machine";
interface example {
  initialState: string;
  actionTable: ActionTable;
}

export const repeatZeroAndOne: example = {
  initialState: "a",
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

export const binaryIncrement: example = {
  initialState: "right",
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

export const binaryPalindlom: example = {
  initialState: "start",
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
