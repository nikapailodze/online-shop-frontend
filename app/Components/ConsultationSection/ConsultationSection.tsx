"use client";

import Link from "next/link";
import styles from "./ConsultationSection.module.css";

const ConsultationSection = () => {
  return (
    <section className={styles.section} id="consultation">
      <div className={styles.copy}>
        <span className={styles.eyebrow}>Online consultation</span>
        <h2 className={styles.title}>Schedule a consultation with us</h2>
        <p className={styles.subtitle}>
          Meet with our endocrine specialists at a time that works for you. Pick a date, choose a
          time slot, and share what you want to discuss so we can prepare ahead of your session.
        </p>
        <div className={styles.actions}>
          <Link href="/consultation" className={styles.primaryButton}>
            Schedule consultation
          </Link>
          <div className={styles.note}>Secure booking for signed-in users.</div>
        </div>
      </div>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>What you will share</h3>
          <p className={styles.panelText}>We collect the essentials to prep your visit.</p>
        </div>
        <ul className={styles.list}>
          <li>Preferred date and time</li>
          <li>Reason for consultation</li>
          <li>Contact details for follow-up</li>
          <li>Optional ID number</li>
        </ul>
        <div className={styles.panelFooter}>
          <span className={styles.badge}>Confidential & secure</span>
          <span className={styles.badge}>Email confirmation</span>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;
