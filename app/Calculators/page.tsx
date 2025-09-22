// app/calculators/page.tsx
import Link from "next/link";
import styles from "./page.module.scss";
import { diabetesRiskMeta } from "./diabetes-risk/meta";
import { drsGriffinMeta } from "./diabetes-risk-griffin-2000/meta";

const calculators = [diabetesRiskMeta,drsGriffinMeta];

export default function CalculatorsIndex() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Endocrinology Calculators</h1>
      <ul className={styles.list}>
        {calculators.map((c) => (
          <li key={c.slug} className={styles.item}>
            <Link href={`/calculators/${c.slug}`} className={styles.link}>
              {c.title}
            </Link>
            <div className={styles.short}>{c.short}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
