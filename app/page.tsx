import DeferredHomeSections from "./Components/DeferredHomeSections/DeferredHomeSections";
import HomeSection from "./Components/HomeSection/HomeSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.homeSection}>
          <HomeSection />
        </div>

        <DeferredHomeSections />
      </div>
    </div>
  );
}
