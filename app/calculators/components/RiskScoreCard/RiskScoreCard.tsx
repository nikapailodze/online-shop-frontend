import React from "react";
import styles from "./RiskScoreCard.module.scss";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

function getRisk(score: number) {
  if (score < 4) return { label: "Low Risk", tone: "low" as const };
  if (score === 4) return { label: "Moderate Risk", tone: "moderate" as const };
  return { label: "High Risk", tone: "high" as const };
}

export default function RiskScoreCard(props: { score: number }) {
  const { language } = useLanguage();
  const info = getRisk(props.score);
  return (
    <div className={`${styles.card} ${styles[info.tone]}`}>
      <div className={styles.row}>
        <span className={styles.title}>
          {translateText("Diabetes Risk Score", language)}
        </span>
        <div className={styles.valueBlock}>
          <div className={styles.value}>{props.score}</div>
          <div className={styles.sub}>{translateText(info.label, language)}</div>
        </div>
      </div>
    </div>
  );
}
