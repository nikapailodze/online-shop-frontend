"use client";
import HomeSection from "./Components/HomeSection/HomeSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.homeSection}>
        <HomeSection/>
      </div>

      <div className={styles.aboutSection}>{/* About Us content */}</div>

      <div className={styles.contactSection}>{/* Contact content */}</div>
    </div>
  );
}
