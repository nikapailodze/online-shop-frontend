"use client";
import { useEffect, useState } from "react";
import styles from "./HomeSection.module.scss";

const HomeSection = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = window.innerHeight;
      const newScale = Math.max(0.8, 1 - (scrollTop / maxScroll) * 0.2);
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.homeSectionWrapper}>
      <div
        className={styles.homeSectionContent}
        style={{ transform: `scale(${scale})` }}
      >
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
