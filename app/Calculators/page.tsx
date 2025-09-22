// app/calculators/page.tsx
import styles from "./page.module.scss";
import { diabetesRiskMeta } from "./diabetes-risk/meta";
import { drsGriffinMeta } from "./diabetes-risk-griffin-2000/meta";
import CardComponent from "../Components/CalculatorSection/CardComponent/CardComponent";

const calculators = [
  diabetesRiskMeta,
  drsGriffinMeta,
  drsGriffinMeta,
  diabetesRiskMeta,
];

export default function CalculatorsIndex() {
  return (
    <main className={styles.main}>
      <div className={styles.titlesWrapper}>
        <h1 className={styles.heading}>Endocrinology Calculators</h1>
        <p className={styles.subTitle}>
          Tools for assessing hormone levels, medication dosages, and other
          endocrine parameters.
        </p>
      </div>
      <div className={styles.cardsWrapper}>
        {calculators.map((c) => (
          <CardComponent
            key={c.slug}
            title={c.title}
            subTitle={c.short}
            slug={c.slug}
          />
        ))}
      </div>
    </main>
  );
}
