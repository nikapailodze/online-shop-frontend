import styles from "./CalcFooter.module.scss";

export default function CalcFooter() {
  return (
    <section aria-label="Site stats" className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.grid}>
          <li className={styles.item}>
            <span className={styles.value}>15+</span>
            <span className={styles.label}>CALCULATORS</span>
          </li>

          <li className={styles.item}>
            <span className={styles.value}>10k+</span>
            <span className={styles.label}>HEALTHCARE PROVIDERS</span>
          </li>

          <li className={styles.item}>
            <span className={styles.value}>99.9%</span>
            <span className={styles.label}>ACCURACY</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
