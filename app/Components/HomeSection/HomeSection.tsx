import styles from "./HomeSection.module.scss";

const HomeSection = () => {
  return (
    <section className={styles.homeSectionWrapper}>
      <div className={styles.homeSectionContent}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>Welcome to Our Online Shop.</h1>
          <p className={styles.title}>Innovating, Disrupting, Redefining.</p>
        </div>{" "}
        <div className={styles.subTitleWrapper}>
          <p className={styles.subTitle}>
            Challenging conventions, breaking limits, and setting new
          </p>
          <p className={styles.subTitle}>
            standards through bold ideas and visionary design.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
