"use client";

import ShoppingItem from "../Components/ShoppingItem/ShoppingItem";
import PageLoader from "../Components/PageLoader/PageLoader";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/api";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/Products`);
        if (!response.ok) {
          throw new Error("Unable to load products");
        }
        const body = await response.json();
        setProducts(body);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load products.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        {error && <p className={styles.subTitle}>{error}</p>}
        {isLoading && <PageLoader compact minHeight="280px" />}
        {products.map((product) => (
          <ShoppingItem
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}
