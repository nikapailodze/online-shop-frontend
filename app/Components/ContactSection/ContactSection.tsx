"use client";

import styles from "./ContactSection.module.css";

const ContactSection = () => {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Contact Endopail</span>
        <h2 className={styles.title}>Talk with the team</h2>
        <p className={styles.subtitle}>
          Questions about the calculators, merch, or partnership ideas? Reach out and we’ll get back
          quickly. Clinical vision by Dr. Mariami Pailodze, product and engineering by Nikolozi
          Pailodze.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Email</h3>
          <p className={styles.cardText}>
            General inquiries and feedback:{" "}
            <a href="mailto:noreplyendopail@gmail.com">noreplyendopail@gmail.com</a>
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Orders & support</h3>
          <p className={styles.cardText}>
            Need help with your order or checkout? Email us and we’ll respond as soon as possible.
          </p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Collaborations</h3>
          <p className={styles.cardText}>
            Interested in clinical content, integrations, or co-branded drops? We’re open to
            partnerships that advance endocrine care.
          </p>
        </div>
      </div>

      <div className={styles.row}>
        <span className={styles.pill}>Clinical lead: Dr. Mariami Pailodze</span>
      </div>

      <div className={styles.row}>
        <a href="mailto:noreplyendopail@gmail.com">
          <button className={styles.button}>Email us</button>
        </a>
        <a href="#shop">
          <button className={`${styles.button} ${styles.secondary}`}>Browse the shop</button>
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
