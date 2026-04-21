import Image from "next/image";
import styles from "./HomeSection.module.scss";

const HomeSection = () => {
  return (
    <section className={styles.homeSectionWrapper}>
      <Image
        src="/mainBG.png"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className={styles.heroImage}
        aria-hidden="true"
      />
      <div className={styles.homeSectionContent}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>
            Welcome to EndoPail
          </h1>
          <p className={styles.title}>
            Smart Calculators for Smarter Care
          </p>
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
