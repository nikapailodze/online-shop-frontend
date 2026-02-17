import React from "react";
import styles from "./SectionCard.module.scss";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

export default function SectionCard(props: { title?: string; children?: React.ReactNode }) {
  const { language } = useLanguage();

  return (
    <div className={styles.card}>
      {props.title ? (
        <div className={styles.header}>{translateText(props.title, language)}</div>
      ) : null}
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
