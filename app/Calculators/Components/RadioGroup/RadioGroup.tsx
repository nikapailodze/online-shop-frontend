import React from "react";
import styles from "./RadioGroup.module.scss";
import RadioOption from "../RadioOption/RadioOption";

type Option = { value: string; label: string };

export default function RadioGroup(props: {
  name: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  columns?: number;
}) {
  const cols = props.columns && props.columns > 1 ? styles.two : styles.one;

  return (
    <>
      <label htmlFor={props.name} className={styles.label}>
        {props.name}
      </label>
      <div className={`${styles.group} ${cols}`}>
        {props.options.map(function (opt, idx) {
          return (
            <RadioOption
              key={opt.value + idx}
              id={`${props.name}-${opt.value}`}
              name={props.name}
              value={opt.value}
              label={opt.label}
              checked={props.value === opt.value}
              onChange={props.onChange}
            />
          );
        })}
      </div>
    </>
  );
}
