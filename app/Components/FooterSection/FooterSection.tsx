"use client";
import styles from "./FooterSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

const FooterSection = () => {
  const { language } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image
            src="/Logo/logo.png"
            alt="Endopail logo"
            width={48}
            height={48}
            className={styles.logoMark}
          />
          <div className={styles.brandText}>
            Endopai
            <span className={styles.brandSub}>
              {translateText("Endocrinology Clinic", language)}
            </span>
          </div>
        </div>

        <div className={styles.links}>
          <Link href="/admin">{translateText("Admin Log In", language)}</Link>
          <span className={styles.divider}>|</span>
          <a href="#">{translateText("Site Map", language)}</a>
          <span className={styles.divider}>|</span>
          <a href="#">{translateText("Privacy Policy", language)}</a>
        </div>

        <div className={styles.socials}>
          <button aria-label="Instagram">IG</button>
          <button aria-label="X">X</button>
          <button aria-label="Facebook">FB</button>
        </div>
      </div>

      <div
        className={`${styles.copyright} ${
          language === "ka" ? styles.copyrightKa : ""
        }`}
      >
        {translateText("Copyright © 2026 Endopail. All rights reserved.", language)}
      </div>
    </footer>
  );
};

export default FooterSection;
