import React from "react";
import styles from "./SectionCard.module.scss";

export default function SectionCard(props: { title?: string; children?: React.ReactNode }) {
  return (
    <div className={styles.card}>
      {props.title ? <div className={styles.header}>{props.title}</div> : null}
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
