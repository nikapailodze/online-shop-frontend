import CardComponent from "../Components/CalculatorSection/CardComponent/CardComponent";
import styles from "./page.module.scss";
import {
  diabetesRiskMeta,
  drsGriffinMeta,
  screeningTreeMeta,
  typePredictorMeta,
  a1cAvgGluMeta,
  homaIrMeta,
  lpirMeta,
  quickiMeta,
  risk7p5Meta,
  sodiumEmmettMeta,
  sodiumHillierMeta,
  sodiumKatzMeta,
} from "./meta";

const calculators = [
  diabetesRiskMeta,
  drsGriffinMeta,
  screeningTreeMeta,
  typePredictorMeta,
  a1cAvgGluMeta,
  homaIrMeta,
  lpirMeta,
  quickiMeta,
  risk7p5Meta,
  sodiumEmmettMeta,
  sodiumHillierMeta,
  sodiumKatzMeta,
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
            icon={c.icon}
          />
        ))}
      </div>
    </main>
  );
}
