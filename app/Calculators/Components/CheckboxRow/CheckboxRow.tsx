import React from "react";
import styles from "./CheckboxRow.module.scss";

export default function CheckboxRow(props: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  badge?: string;
  badgeTone?: "green" | "orange";
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.checked);
  }

  return (
    <label htmlFor={props.id} className={styles.row}>
      <input
        type="checkbox"
        id={props.id}
        checked={props.checked}
        onChange={handleChange}
        className={styles.checkbox}
      />
      <span className={styles.text}>{props.label}</span>
      {props.badge ? (
        <span
          className={`${styles.badge} ${
            props.badgeTone === "green" ? styles.green : styles.orange
          }`}
        >
          {props.badge}
        </span>
      ) : null}
    </label>
  );
}
