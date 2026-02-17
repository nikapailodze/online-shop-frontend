"use client";

import { useEffect, useState } from "react";
import ShoppingItem from "../ShoppingItem/ShoppingItem";
import styles from "./ProductionSection.module.scss";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

const ProductionSection = () => (
  <TranslatedProductionSection />
);

const TranslatedProductionSection = () => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const merchItems = [
    { id: 1, imageUrl: "/merch2.png" },
    { id: 2, imageUrl: "/merch1.png" },
    { id: 3, imageUrl: "/merch3.png" },
  ];

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 640);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % merchItems.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isMobile, merchItems.length]);

  const itemsToRender = isMobile
    ? [merchItems[activeIndex]]
    : merchItems;

  return (
    <section className={styles.productionSection}>
      <div className={styles.content}>
        <h2 className={styles.productionTitle}>
          {translateText("Wear Your Hormones Proudly", language)}
        </h2>

        <div className={styles.productionItemsWrapper}>
          {itemsToRender.map((item) => (
            <ShoppingItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              name={translateText("VANTA Coat", language)}
              price={320}
              description={translateText(
                "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience.",
                language
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductionSection;
