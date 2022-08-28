import React from "react";
import { TuringMachine } from "../service/example";
import { UniversalTuringMachine } from "../service/universal_machine";
import styles from "./control.module.css";
import * as buttons from "../service/buttons";

interface IProps {
  utm: UniversalTuringMachine;
  machine: TuringMachine;
  power: boolean;
  input: string;
  label: string;
}

export default function Control({ utm, machine, power, input, label }: IProps) {
  return (
    <section className={styles.container}>
      <button
        onClick={
          power
            ? () => {
                buttons.pause(utm);
              }
            : () => {
                buttons.play(utm);
              }
        }
        className={power ? styles.on : styles.off}
      >
        {power ? "Pause ||" : "Execute ▶"}
      </button>
      <button
        onClick={async () => {
          buttons.step(utm);
        }}
      >
        Step ↷
      </button>
      <button
        onClick={async () => {
          buttons.reset(utm, machine, input, label);
        }}
      >
        Reset ↺
      </button>
    </section>
  );
}
