"use client";

import { useEffect, useState } from "react";
import ShoppingItem from "../ShoppingItem/ShoppingItem";
import styles from "./ProductionSection.module.scss";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

type MerchItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  description: string;
};

const ProductionSection = () => (
  <TranslatedProductionSection />
);

const TranslatedProductionSection = () => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001"}/api/Products`)
      .then((response) => response.json())
      .then((body) => setMerchItems(Array.isArray(body) ? body.slice(0, 3) : []))
      .catch(() => setMerchItems([]));
  }, []);

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
              name={translateText(item.name, language)}
              price={item.price}
              description={translateText(item.description, language)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductionSection;
