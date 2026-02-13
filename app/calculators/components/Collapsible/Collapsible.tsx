import React, { useState } from "react";
import styles from "./Collapsible.module.scss";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

export default function Collapsible(props: { title: string; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();

  function toggle() { setOpen(!open); }

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.trigger} onClick={toggle}>
        <span>{translateText(props.title, language)}</span>
        <span className={`${styles.chev} ${open ? styles.rotate : ""}`}>▾</span>
      </button>
      {open ? <div className={styles.content}>{props.children}</div> : null}
    </div>
  );
}
