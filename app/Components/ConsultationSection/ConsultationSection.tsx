"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ConsultationSection.module.css";

const ConsultationSection = () => {
  return (
    <section className={styles.section} id="consultation">
      <div className={styles.container}>
        <h2 className={styles.title}>Meet the Doctor</h2>
        <div className={styles.content}>
          <div className={styles.imageCard}>
            <Image
              src="/drPicture/drPic.JPG"
              alt="Doctor portrait"
              width={420}
              height={520}
              className={styles.image}
            />
          </div>
          <div className={styles.textBlock}>
            <h3 className={styles.name}>Dr. Mariami Pailodze</h3>
            <p className={styles.bio}>
              Dedicated to endocrine care and practical tools that help
              clinicians make confident decisions. EndoPail blends clinical
              expertise with approachable design so every calculator feels
              clear, fast, and trustworthy. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Sunt, cupiditate neque? Eius id
              facilis vero at voluptates consequatur corrupti, reprehenderit ut
              quasi consectetur unde sed! Libero veniam iure iste laudantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque vero beatae numquam provident nisi cupiditate necessitatibus, aspernatur incidunt sed iure consequuntur eligendi quidem eum veritatis repudiandae suscipit dolor inventore!
            </p>
            <Link href="/consultation" className={styles.primaryButton}>
              Schedule appointment with me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;
