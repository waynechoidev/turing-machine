import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  binaryIncrement,
  binaryPalindlom,
  repeatZeroAndOne,
} from "../service/example";
import { TuringMachine } from "../service/machine";
import styles from "../styles/Home.module.css";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Home: NextPage = () => {
  const [state, setState] = useState("");
  const [idx, setIdx] = useState(10);
  const [tape, setTape] = useState<string[]>([]);
  const [universalMachine] = useState(
    new TuringMachine(setState, setIdx, setTape)
  );
  const [input, setInput] = useState("01010");
  const [label, setLabel] = useState<machineItem>("Repeat Binary");
  const [machine, setMachine] = useState(binaryPalindlom);

  const slideRef = useRef<HTMLDivElement>(null);
  const cellWidth = 100;

  type machineItem = "Repeat Binary" | "Binary Increment" | "Binary Palindlom";

  function reset() {
    universalMachine.turnOff();
    universalMachine.init(
      input.split(""),
      machine.actionTable,
      machine.initialState
    );
  }

  useEffect(() => {
    switch (label) {
      case "Repeat Binary":
        setMachine(repeatZeroAndOne);
        setInput("");
        break;
      case "Binary Increment":
        setMachine(binaryIncrement);
        setInput("1101");
        break;
      case "Binary Palindlom":
        setMachine(binaryPalindlom);
        setInput("1011101");
        break;
    }
  }, [label]);

  useEffect(() => {
    reset();
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

  const machineButton = (machineItem: machineItem) => {
    return (
      <input
        className={styles.radio}
        type="radio"
        name="machine"
        value={machineItem}
        checked={label === machineItem}
        onChange={() => {
          setLabel(machineItem);
        }}
      />
    );
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>Turing Machine Simulator</h1>
      </header>
      <div className={styles.ribbon_wrapper}>
        <div className={styles.niddle}></div>
        <div className={styles.ribbon} ref={slideRef}>
          {tape.map((i, idx) => (
            <span className={styles.cell} key={idx}>
              <b>{i}</b>
            </span>
          ))}
        </div>
      </div>
      <div className={styles.status}>
        <section className={styles.setup_wrapper}>
          <form className={styles.setup}>
            <div>
              Input:{" "}
              <input
                className={styles.input}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              ></input>
            </div>
            <div className={styles.machine_option}>
              <p>Machine</p>
              <div>
                {machineButton("Repeat Binary")}
                <label>Repeat Binary</label>
              </div>
              <div>
                {machineButton("Binary Increment")}
                <label>Binary Increment</label>
              </div>
              <div>
                {machineButton("Binary Palindlom")}
                <label>Binary Palindlom</label>
              </div>
            </div>
          </form>
        </section>
        <section className={styles.processor_wrapper}>
          <div className={styles.arrow}>
            <Image src="/up.svg" width="50px" height="50px" alt="arrow" />
          </div>
          <div className={styles.processor}>
            <div className={styles.states}>
              {machine.stateList?.map((i, key) => (
                <li key={key} className={i == state ? styles.highlited : ""}>
                  {i}
                </li>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.control}>
          <button
            onClick={async () => {
              universalMachine.turnOn();
              let run = setInterval(() => {
                if (universalMachine.checkSwitch()) universalMachine.step();
                else clearInterval(run);
              }, 1000);
            }}
          >
            Execute
          </button>
          <button
            onClick={async () => {
              reset();
            }}
          >
            Reset
          </button>
        </section>
      </div>
      <section className={styles.table_wrapper}>
        <div className={styles.table}>
          <div className={styles.tr}>
            <span>In State</span>
            <span>Reading</span>
            <span>Write</span>
            <span>Move</span>
            <span>New State</span>
            <span>Comment</span>
          </div>
          <hr />
          {machine.actionTable?.map((i, key) => (
            <div key={key}>
              <div className={styles.tr}>
                <span>{i.inState}</span>
                <span>{i.reading}</span>
                <span>{i.write}</span>
                <span>{i.move}</span>
                <span>{i.newState}</span>
                <span>{i.comment}</span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
