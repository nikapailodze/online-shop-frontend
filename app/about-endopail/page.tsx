"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.label}>About Endopail</p>
        <h1 className={styles.title}>Clinical tools and commerce for endocrine care</h1>
        <p className={styles.subtitle}>
          Endopail brings together evidence-based endocrine calculators and a curated shop of
          endocrine-inspired products to support clinicians and patients. The medical vision comes
          from Dr. Mariami Pailodze, with product execution and engineering by Nikolozi Pailodze.
        </p>
        <div className={styles.cta}>
          <Link href="/calculators">
            <button className={styles.button}>Explore calculators</button>
          </Link>
          <Link href="/shop">
            <button className={`${styles.button} ${styles.secondary}`}>Visit the shop</button>
          </Link>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>What the app serves</h3>
          <p className={styles.cardText}>
            Fast, clinically-focused endocrine calculators for screening, risk estimation, and
            treatment planning—paired with a storefront for endocrine-themed gear that funds further
            tool development.
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>For clinicians</h3>
          <p className={styles.cardText}>
            Point-of-care utilities to cut friction: metabolic syndrome criteria, fracture risk
            indices, sodium corrections, diabetes screening trees, and more—kept consistent and easy
            to reference during consults.
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>For patients & learners</h3>
          <p className={styles.cardText}>
            Clear outputs and terminology that align with clinical guidance, plus merch that sparks
            conversation and supports ongoing content.
          </p>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Medical lead</h3>
          <p className={styles.cardText}>
            Dr. Mariami Pailodze shapes the clinical ideas, ensuring calculators follow current
            endocrine evidence and real-world workflows.
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Product & engineering</h3>
          <p className={styles.cardText}>
            Built and maintained by Nikolozi Pailodze—architecture, UI, and integrations across the
            calculators, cart, checkout, and profile experience.
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>What’s inside</h3>
          <p className={styles.cardText}>
            Authenticated profiles, saved orders, secure cart/checkout, and a growing library of
            endocrine calculators—all under the Endopail brand.
          </p>
        </div>
      </section>

      <section className={styles.highlight}>
        <p className={styles.label}>Why it matters</p>
        <p className={styles.subtitle}>
          Endopail is built to keep endocrine care practical: tools you can trust, a store that
          funds more tools, and a focused team—clinical leadership from Dr. Mariami Pailodze and
          development by Nikolozi Pailodze—iterating quickly for clinicians and patients alike.
        </p>
      </section>
    </main>
  );
}
