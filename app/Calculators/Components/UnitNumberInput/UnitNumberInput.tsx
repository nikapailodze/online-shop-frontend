import React from "react";
import styles from "./UnitNumberInput.module.scss";

export default function UnitNumberInput(props: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  unit?: string; // "kg" / "cm"
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value);
  }

  return (
    <div className={styles.wrap}>
      <label htmlFor={props.id} className={styles.label}>{props.label}</label>
      <div className={styles.field}>
        <input
          id={props.id}
          type="number"
          value={props.value}
          onChange={handleChange}
          placeholder={props.placeholder}
          className={styles.input}
        />
        {props.unit ? <span className={styles.unit}>{props.unit}</span> : null}
      </div>
    </div>
  );
}
