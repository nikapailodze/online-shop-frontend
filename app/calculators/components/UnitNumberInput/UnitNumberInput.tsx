import React from "react";
import styles from "./UnitNumberInput.module.scss";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

export default function UnitNumberInput(props: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  unit?: string;
}) {
  const { language } = useLanguage();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value);
  }

  return (
    <div className={styles.wrap}>
      <label htmlFor={props.id} className={styles.label}>
        {translateText(props.label, language)}
      </label>
      <div className={styles.field}>
        <input
          id={props.id}
          type="number"
          value={props.value}
          onChange={handleChange}
          onFocus={props.onFocus}
          placeholder={props.placeholder ? translateText(props.placeholder, language) : undefined}
          className={styles.input}
        />
        {props.unit ? <span className={styles.unit}>{translateText(props.unit, language)}</span> : null}
      </div>
    </div>
  );
}
