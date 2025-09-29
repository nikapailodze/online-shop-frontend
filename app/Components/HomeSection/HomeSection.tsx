"use client";
import styles from "./HomeSection.module.scss";

const HomeSection = () => {
  return (
    <section className={styles.homeSectionWrapper}>
      <div className={styles.homeSectionContent}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>Welcome to EndoPie</h1>
          <p className={styles.title}>Smart Calculators for Smarter Care</p>
        </div>
        <div className={styles.subTitleWrapper}>
          <p className={styles.subTitle}>
            Built by a passionate endocrine specialist,
          </p>
          <p className={styles.subTitle}>
            this site is designed to empower the endocrine community with
            practical tools and relatable flair.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
