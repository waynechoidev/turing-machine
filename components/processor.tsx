import React from "react";
import styles from "./processor.module.css";
import { assetPrefix } from "../next.config";
import { TuringMachine } from "../service/example";

interface IProps {
  machine: TuringMachine;
  state: string;
}

export default function Processor({ machine, state }: IProps) {
  return (
    <section className={styles.container}>
      <div className={styles.arrow}>
        <img
          src={`${assetPrefix}/up.svg`}
          width="50px"
          height="50px"
          alt="arrow"
        />
      </div>
      <div className={styles.processor}>
        <h2>Machine States</h2>
        <div className={styles.states}>
          {machine.stateList?.map((i, key) => (
            <li key={key} className={i == state ? styles.highlited : ""}>
              {i}
            </li>
          ))}
        </div>
      </div>
    </section>
  );
}
