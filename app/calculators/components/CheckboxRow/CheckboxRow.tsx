import React from "react";
import styles from "./CheckboxRow.module.scss";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

export default function CheckboxRow(props: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  badge?: string;
  badgeTone?: "green" | "orange";
}) {
  const { language } = useLanguage();

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
      <span className={styles.text}>{translateText(props.label, language)}</span>
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
