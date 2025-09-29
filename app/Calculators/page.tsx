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
  fractureWithBmdMeta,
  fractureWithoutBmdMeta,
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
  fractureWithBmdMeta,
  fractureWithoutBmdMeta
];

export default function CalculatorsIndex() {
  return (
    <main className={styles.main}>
      <div className={styles.titlesWrapper}>
        <h1 className={styles.heading}>All Endocrinology Calculators</h1>
        <p className={styles.subTitle}>
          Tools for assessing hormone levels, medication dosages, and other
          endocrine parameters.
        </p>
      </div>
      <div className={styles.cardsMain}>
        <div className={styles.cardsWrapper}>
          <h3 className={styles.categoryTitle}>Diabetes</h3>
          <div className={styles.cardsContainer}>
            {calculators
              .filter((c) => c.category === "Diabetes")
              .map((c) => (
                <CardComponent
                  key={c.slug}
                  title={c.title}
                  subTitle={c.short}
                  slug={c.slug}
                  icon={c.icon}
                />
              ))}
          </div>
        </div>
        <div className={styles.cardsWrapper}>
          <h3 className={styles.categoryTitle}>Fracture Risk</h3>
          <div className={styles.cardsContainer}>
            {calculators
              .filter((c) => c.category === "Fracture Risk")
              .map((c) => (
                <CardComponent
                  key={c.slug}
                  title={c.title}
                  subTitle={c.short}
                  slug={c.slug}
                  icon={c.icon}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
