import React from "react";
import styles from "./table.module.css";
import { TuringMachine } from "../service/example";

interface IProps {
  machine: TuringMachine;
}

export default function Table({ machine }: IProps) {
  return (
    <section className={styles.container}>
      <div className={styles.table}>
        <h2>Action Table</h2>
        <div className={styles.tr}>
          <span>In State</span>
          <span>Reading</span>
          <span>Write</span>
          <span>Move</span>
          <span>New State</span>
          {/* <span>Comment</span> */}
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
              {/* <span>{i.comment}</span> */}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </section>
  );
}
