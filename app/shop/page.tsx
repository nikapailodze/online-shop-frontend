"use client";

import ShoppingItem from "../Components/ShoppingItem/ShoppingItem";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.pageTitleWrapper}>
        <h1 className={styles.title}>Your wardrobe called — it’s low on hormones. BUY NOW</h1>
        <p className={styles.subTitle}>
          Help us grow by purchasing our exclusive endocrine-themed merch. Every
          t-shirt you buy supports the development of more free medical tools
          and calculators for the endocrine community.
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
