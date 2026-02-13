"use client";
import CalculatorSection from "./Components/CalculatorSection/CalculatorSection";
import HomeSection from "./Components/HomeSection/HomeSection";
import ProductionSection from "./Components/ProductionSection/ProductionSection";
import ConsultationSection from "./Components/ConsultationSection/ConsultationSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.homeSection}>
          <HomeSection />
        </div>

        <div className={styles.productionSection}>
          <CalculatorSection />
        </div>

        <div className={styles.consultationSection}>
          <ConsultationSection />
        </div>

        <div className={styles.productionSection}>
          <ProductionSection />
        </div>
      </div>
    </div>
  );
}
