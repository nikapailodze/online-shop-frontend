import React from "react";
import styles from "./RiskScoreCard.module.scss";

function getRisk(score: number) {
  if (score < 4) return { label: "Low Risk", tone: "low" as const };
  if (score === 4) return { label: "Moderate Risk", tone: "moderate" as const };
  return { label: "High Risk", tone: "high" as const };
}

export default function RiskScoreCard(props: { score: number }) {
  const info = getRisk(props.score);
  return (
    <div className={`${styles.card} ${styles[info.tone]}`}>
      <div className={styles.row}>
        <span className={styles.title}>Diabetes Risk Score</span>
        <div className={styles.valueBlock}>
          <div className={styles.value}>{props.score}</div>
          <div className={styles.sub}>{info.label}</div>
        </div>
      </div>
    </div>
  );
}
