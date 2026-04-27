"use client";

import dynamic from "next/dynamic";
import styles from "@/app/page.module.css";

const CalculatorSection = dynamic(
  () => import("../CalculatorSection/CalculatorSection"),
  {
    loading: () => <div className={styles.deferredSectionPlaceholder} />,
    ssr: false,
  }
);

const ConsultationSection = dynamic(
  () => import("../ConsultationSection/ConsultationSection"),
  {
    loading: () => <div className={styles.deferredSectionPlaceholder} />,
    ssr: false,
  }
);

const ProductionSection = dynamic(
  () => import("../ProductionSection/ProductionSection"),
  {
    loading: () => <div className={styles.deferredSectionPlaceholder} />,
    ssr: false,
  }
);

export default function DeferredHomeSections() {
  return (
    <>
      <div className={styles.productionSection}>
        <CalculatorSection />
      </div>

      <div className={styles.consultationSection}>
        <ConsultationSection />
      </div>

      <div className={styles.productionSection}>
        <ProductionSection />
      </div>
    </>
  );
}
