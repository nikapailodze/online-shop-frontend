import React from "react";
import styles from "./RadioOption.module.scss";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

type Props = {
  name: string;
  id: string;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (v: string) => void;
};

export default function RadioOption(props: Props) {
  const { language } = useLanguage();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.onChange) props.onChange(e.target.value);
  }

  return (
    <label htmlFor={props.id} className={styles.option}>
      <input
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={handleChange}
        className={styles.input}
      />
      <span className={styles.label}>{translateText(props.label, language)}</span>
    </label>
  );
}
