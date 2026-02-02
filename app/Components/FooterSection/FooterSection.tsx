"use client";
import styles from "./FooterSection.module.scss";

const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoMark}>EP</div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>ENDOPAIL</span>
            <span className={styles.brandSub}>Endocrinology Clinic</span>
          </div>
        </div>

        <div className={styles.links}>
          <a href="#">Admin Log In</a>
          <span className={styles.divider}>|</span>
          <a href="#">Site Map</a>
          <span className={styles.divider}>|</span>
          <a href="#">Privacy Policy</a>
        </div>

        <div className={styles.socials}>
          <button aria-label="Instagram">IG</button>
          <button aria-label="X">X</button>
          <button aria-label="Facebook">FB</button>
        </div>
      </div>

      <div className={styles.copyright}>
        Copyright © 2026 Endopail. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
