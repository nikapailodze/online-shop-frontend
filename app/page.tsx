"use client";
import HomeSection from "./Components/HomeSection/HomeSection";
import ProductionSection from "./Components/ProductionSection/ProductionSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.homeSection}>
        <HomeSection/>
      </div>

      {/* <div className={styles.productionSection}>
        <ProductionSection />
      </div> */}

      <div className={styles.contactSection}>{/* Contact content */}</div>

      <div className={styles.productionSection}>
        <ProductionSection />
      </div>
    </div>
  );
}
