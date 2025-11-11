"use client";

import Image from "next/image";
import styles from "./page.module.css";
import SizeSelector from "./Components/SizeSelector/SizeSelector";
import ColorSelector from "./Components/ColorsSelector/ColorsSelector";
import InformationCard from "./Components/InformationCard/InformationCard";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useCartRef } from "@/app/Context/CartRefContext";

export type ColorOption = "black" | "blue" | "white" | "gray" | "brown";

interface Product {
  image: string;
  price: number;
  name: string;
  description: string;
  sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL")[];
  colors: ColorOption[];
}

const product: Product = {
  image: "/merch1.png",
  price: 99.99,
  name: "VANTA Suite",
  description:
    "tralaleo tralala tishirt Fluid structure meets bold tailoring. A statement in modern minimalism.",
  sizes: ["S", "M", "L", "XL"],
  colors: ["black", "blue", "gray", "brown"],
};

export default function Home() {
  const cartRef = useCartRef();
  const imageRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const [showFlyingImage, setShowFlyingImage] = useState(false);

  const handleAddToCart = () => {
    if (!mainImageRef.current || !cartRef?.current || !imageRef.current) return;

    const imgRect = mainImageRef.current.getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();

    const flyImage = imageRef.current;
    flyImage.style.left = `${imgRect.left}px`;
    flyImage.style.top = `${imgRect.top}px`;
    flyImage.style.opacity = "1";
    flyImage.style.width = "200px";

    setShowFlyingImage(true);

    gsap.to(flyImage, {
      duration: 0.8,
      left: cartRect.left,
      top: cartRect.top,
      width: 20,
      onComplete: () => setShowFlyingImage(false),
    });

    gsap.to(flyImage, {
      duration: 0.3,
      opacity: 0,
      delay: 0.5,
    });
  };

  return (
    <div className={styles.page}>
      {}
      <div
        ref={imageRef}
        style={{
          position: "fixed",
          zIndex: 1000,
          width: 200,
          height: "auto",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        {showFlyingImage && (
          <Image
            src={product.image}
            width={535}
            height={800}
            alt={product.name}
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </div>

      <section className={styles.mainInfoWrapper}>
        <div className={styles.mainImageWrapper} ref={mainImageRef}>
          <Image
            src={product.image}
            width={535}
            height={800}
            alt={product.name}
            className={styles.mainImage}
          />
        </div>

        <div className={styles.mainInfoContent}>
          <div className={styles.mainInfo}>
            <div className={styles.titlesWrapper}>
              <h1 className={styles.heading2}>{product.name}</h1>
              <p className={styles.description}>{product.description}</p>
            </div>

            <p className={styles.heading3}>{product.price} GEL</p>

            <div className={styles.slectionWrapper}>
              <div className={styles.sizesWrapper}>
                <h3 className={styles.heading3}>Size</h3>
                <SizeSelector sizes={product.sizes} disabledSizes={["XL"]} />
              </div>
              <div className={styles.sizesWrapper}>
                <h3 className={styles.heading3}>Color</h3>
                <ColorSelector colors={product.colors} />
              </div>
            </div>

            <div className={styles.buttonWrapper}>
              <button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
            </div>
          </div>

          <div className={styles.informationWrapper}>
            <InformationCard
              title="What's your return policy?"
              description="Items can be exchanged for another product within 14 days."
            />
            <InformationCard
              title="How long does shipping take?"
              description="Shipping is immediate or within 4 days if in stock."
            />
            <InformationCard
              title="How is the product delivered?"
              description="We deliver via courier. Shipping cost varies by location."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
