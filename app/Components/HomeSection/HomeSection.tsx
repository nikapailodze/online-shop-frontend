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
          <h1 className={styles.title}>Welcome to Our Online Shop.</h1>
          <p className={styles.title}>Innovating, Disrupting, Redefining.</p>
        </div>
        <div className={styles.subTitleWrapper}>
          <p className={styles.subTitle}>
            Challenging conventions, breaking limits, and setting new
          </p>
          <p className={styles.subTitle}>
            standards through bold ideas and visionary design.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
