import React from "react";
import styles from "./RadioGroup.module.scss";
import RadioOption from "../RadioOption/RadioOption";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

type Option = { value: string; label: string };

export default function RadioGroup(props: {
  name: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  columns?: number;
  showLabel?: boolean;
}) {
  const cols = props.columns && props.columns > 1 ? styles.two : styles.one;
  const { language } = useLanguage();
  const showLabel = props.showLabel ?? false;

  return (
    <>
      {showLabel ? (
        <label htmlFor={props.name} className={styles.label}>
          {translateText(props.name, language)}
        </label>
      ) : null}
      <div className={`${styles.group} ${cols}`}>
        {props.options.map(function (opt, idx) {
          return (
            <RadioOption
              key={opt.value + idx}
              id={`${props.name}-${opt.value}`}
              name={props.name}
              value={opt.value}
              label={translateText(opt.label, language)}
              checked={props.value === opt.value}
              onChange={props.onChange}
            />
          );
        })}
      </div>
    </>
  );
}
