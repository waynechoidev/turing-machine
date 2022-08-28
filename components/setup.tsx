import React, { Dispatch, SetStateAction } from "react";
import { itemType } from "../service/example";
import styles from "./setup.module.css";

interface IProps {
  input: string;
  label: string;
  setInput: Dispatch<SetStateAction<string>>;
  setLabel: Dispatch<SetStateAction<itemType>>;
}

export default function Setup({ input, label, setInput, setLabel }: IProps) {
  const machineButton = (machineItem: itemType) => {
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
    <section className={styles.container}>
      <div className={styles.setup}>
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
      </div>
    </section>
  );
}
