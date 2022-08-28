import React, { RefObject } from "react";
import styles from "./tape.module.css";

interface IProps {
  slideRef: RefObject<HTMLDivElement>;
  tape: string[];
}

export default function Tape({ slideRef, tape }: IProps) {
  return (
    <div className={styles.container}>
      <div className={styles.niddle}></div>
      <div className={styles.tape} ref={slideRef}>
        {tape.map((i, idx) => (
          <span className={styles.cell} key={idx}>
            <b>{i}</b>
          </span>
        ))}
      </div>
    </div>
  );
}
