"use client";

import ShoppingItem from "../Components/ShoppingItem/ShoppingItem";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.pageTitleWrapper}>
        <h1 className={styles.title}>
          Your wardrobe called — it’s low on hormones.
        </h1>
        <div className={styles.spinWrapper}>
        <div className={styles.spinContainer}>
          <p className={styles.spinText}>BUY NOW</p>
        </div>

        </div>
        <p className={styles.subTitle}>
          Help us grow by purchasing our exclusive endocrine-themed merch. Every
          t-shirt you buy supports the development of more free medical tools
          and calculators for the endocrine community.
        </p>
      </div>
      <div className={styles.productionItemsWrapper}>
        <ShoppingItem
          imageUrl="/merch1.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/merch2.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/merch3.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/merch1.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/merch2.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/merch3.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/merch1.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/merch2.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/merch3.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
      </div>
    </div>
  );
}
