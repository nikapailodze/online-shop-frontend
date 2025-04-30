"use client";

import ShoppingItem from "../Components/ShoppingItem/ShoppingItem";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.pageTitleWrapper}>
        <h1 className={styles.title}>Future Brain-Rot Design</h1>
        <p className={styles.subTitle}>
          A selection of statement pieces that redefine style, precision, and
          innovation.
        </p>
      </div>
      <div className={styles.productionItemsWrapper}>
        <ShoppingItem
          imageUrl="/test/manHandUp.avif"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/shopfinalbss.jpeg"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/tralaleoShirt.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/shopfinalbss-removebg-preview.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/shopfinalbss.jpeg"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/tralaleoShirt.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/tralaleoShirt.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/tralaleoShirt.png"
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
