import React, { useState } from "react";
import styles from "./Collapsible.module.scss";

export default function Collapsible(props: { title: string; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  function toggle() { setOpen(!open); }

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.trigger} onClick={toggle}>
        <span>{props.title}</span>
        <span className={`${styles.chev} ${open ? styles.rotate : ""}`}>▾</span>
      </button>
      {open ? <div className={styles.content}>{props.children}</div> : null}
    </div>
  );
}
