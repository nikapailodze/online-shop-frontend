"use client";

import ShoppingItem from "../ShoppingItem/ShoppingItem";
import styles from "./ProductionSection.module.scss";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

const ProductionSection = () => (
  <TranslatedProductionSection />
);

const TranslatedProductionSection = () => {
  const { language } = useLanguage();

  return (
    <section className={styles.productionSection}>
      <div className={styles.content}>
        <h2 className={styles.productionTitle}>
          {translateText("Wear Your Hormones Proudly", language)}
        </h2>

        <div className={styles.productionItemsWrapper}>
          <ShoppingItem
            id={1}
            imageUrl="/merch2.png"
            name={translateText("VANTA Coat", language)}
            price={320}
            description={translateText(
              "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience.",
              language
            )}
          />
          <ShoppingItem
            id={2}
            imageUrl="/merch1.png"
            name={translateText("VANTA Coat", language)}
            price={320}
            description={translateText(
              "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience.",
              language
            )}
          />
          <ShoppingItem
            id={3}
            imageUrl="/merch3.png"
            name={translateText("VANTA Coat", language)}
            price={320}
            description={translateText(
              "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience.",
              language
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductionSection;
