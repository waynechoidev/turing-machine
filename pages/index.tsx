import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { binaryIncrement, binaryPalindlom } from "../service/example";
import { TuringMachine } from "../service/machine";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [state, setState] = useState("");
  const [idx, setIdx] = useState(20);
  const [tape, setTape] = useState<string[]>([]);
  const [machine] = useState(new TuringMachine(setState, setIdx, setTape));

  useEffect(() => {
    const program = binaryPalindlom;

    machine.init(
      ["1", "1", "0", "1", "1", "0"],
      program.actionTable,
      program.initialState
    );
  }, [machine]);

  return (
    <div className={styles.container}>
      <button
        onClick={async () => {
          machine.turnOn();
          let run = setInterval(() => {
            if (machine.checkSwitch()) machine.step();
            else clearInterval(run);
          }, 500);
        }}
      ></button>
      {tape.map((i, idx) => (
        <span key={idx}>{i}</span>
      ))}

      <p>{`idx: ${idx}`}</p>
      <p>{`state: ${state}`}</p>
    </div>
  );
};

export default Home;
