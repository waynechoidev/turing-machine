import React from "react";
import { TuringMachine } from "../service/example";
import { UniversalTuringMachine } from "../service/universal_machine";
import styles from "./control.module.css";

interface IProps {
  utm: UniversalTuringMachine;
  machine: TuringMachine;
  power: boolean;
  input: string;
  play: (utm: UniversalTuringMachine) => Promise<void>;
  pause: (utm: UniversalTuringMachine) => Promise<void>;
  reset: (
    utm: UniversalTuringMachine,
    machine: TuringMachine,
    input: string
  ) => void;
}

export default function Control({
  utm,
  machine,
  power,
  input,
  play,
  pause,
  reset,
}: IProps) {
  return (
    <section className={styles.container}>
      <button
        onClick={
          power
            ? () => {
                pause(utm);
              }
            : () => {
                play(utm);
              }
        }
        className={power ? styles.on : styles.off}
      >
        {power ? "Pause ||" : "Execute ▶"}
      </button>
      <button
        onClick={async () => {
          utm.step();
        }}
      >
        Step ↷
      </button>
      <button
        onClick={async () => {
          reset(utm, machine, input);
        }}
      >
        Reset ↺
      </button>
    </section>
  );
}
