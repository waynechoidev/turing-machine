import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Control from "../components/control";
import * as machines from "../service/example";
import { UniversalTuringMachine } from "../service/universal_machine";
import Tape from "../components/tape";
import Setup from "../components/setup";
import Processor from "../components/processor";
import Table from "../components/table";
import { reset } from "../service/buttons";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Home: NextPage = () => {
  const [power, setPower] = useState(false);
  const [state, setState] = useState("");
  const [idx, setIdx] = useState(50);
  const [tape, setTape] = useState<string[]>([]);
  const [universalMachine] = useState(
    new UniversalTuringMachine(setPower, setState, setIdx, setTape)
  );
  const [input, setInput] = useState("");
  const [label, setLabel] = useState<machines.machines>("Copy 1s");
  const [machine, setMachine] = useState(machines.binaryPalindlom);

  const slideRef = useRef<HTMLDivElement>(null);
  const date = new Date();
  const cellWidth = 50;

  useEffect(() => {
    switch (label) {
      case "Copy 1s":
        setMachine(machines.copy1s);
        setInput("1111");
        break;
      case "Repeat Binary":
        setMachine(machines.repeatBinary);
        setInput("");
        break;
      case "Binary Palindlom":
        setMachine(machines.binaryPalindlom);
        setInput("1011101");
        break;
      case "Binary Increment":
        setMachine(machines.binaryIncrement);
        setInput("1101");
        break;
      case "Binary Addition":
        setMachine(machines.binaryAddition);
        setInput("1011+11001");
        break;
      case "3-State Busy Beaver":
        setMachine(machines.thirdBusyBeaver);
        setInput("");
        break;
      case "4-State Busy Beaver":
        setMachine(machines.fourthBusyBeaver);
        setInput("");
        break;
    }
  }, [label]);

  useEffect(() => {
    reset(universalMachine, machine, input, label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, machine, universalMachine]);

  useIsomorphicLayoutEffect(() => {
    const ribbonLength = cellWidth * tape.length;
    slideRef.current!.style.width = `${ribbonLength}px`;
  }, [tape.length]);

  useIsomorphicLayoutEffect(() => {
    const ribbonLength = cellWidth * tape.length;
    slideRef.current!.style.transition = "all 0.5s ease-in-out";
    slideRef.current!.style.transform = `translateX(${
      -50 + (((tape.length / 2 - idx - 0.5) * cellWidth) / ribbonLength) * 100
    }%)`;
  }, [idx, tape.length]);

  return (
    <div className={styles.container}>
      <header>
        <h1>Turing Machine Simulator</h1>
      </header>
      <Tape slideRef={slideRef} tape={tape} />
      <div className={styles.status}>
        <Setup
          input={input}
          label={label}
          setInput={setInput}
          setLabel={setLabel}
        />
        <Processor machine={machine} state={state} />
        <Control
          utm={universalMachine}
          machine={machine}
          power={power}
          input={input}
          label={label}
        />
      </div>
      <Table machine={machine} />

      <footer className={styles.footer}>
        (C) {date.getFullYear()}. Wayne Choi. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
