import React, { Dispatch, SetStateAction } from "react";
import { machineNameList, machines } from "../service/example";
import styles from "./setup.module.css";

interface IProps {
  input: string;
  label: string;
  setInput: Dispatch<SetStateAction<string>>;
  setLabel: Dispatch<SetStateAction<machines>>;
}

export default function Setup({ input, label, setInput, setLabel }: IProps) {
  return (
    <section className={styles.container}>
      <div className={styles.setup}>
        <div>
          <b>Input: </b>
          <input
            className={styles.input}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
        </div>
        <b>Choose Machine</b>
        <div className={styles.machine_option}>
          {machineNameList.map((i, key) => (
            <span
              key={key}
              className={styles.machine_item}
              onClick={() => {
                setLabel(i);
              }}
            >
              <input
                className={styles.radio}
                type="radio"
                name="machine"
                value={i}
                checked={label === i}
                onChange={() => {
                  setLabel(i);
                }}
              />
              <label className={styles.label}>{i}</label>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
