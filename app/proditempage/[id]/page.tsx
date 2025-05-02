"use client";
import Image from "next/image";
import styles from "./page.module.css";
import SizeSelector from "./Components/SizeSelector/SizeSelector";
import ColorSelector from "./Components/ColorsSelector/ColorsSelector";
import InformationCard from "./Components/InformationCard/InformationCard";

export type ColorOption = "black" | "blue" | "white" | "gray" | "brown";

interface Product {
  image: string;
  price: number;
  name: string;
  description: string;
  sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL")[];
  colors: ("black" | "blue" | "white" | "gray" | "brown")[];
}

const product: Product = {
  image: "/tralaleoShirt.png",
  price: 99.99,
  name: "VANTA Suite",
  description:
    "tralaleo tralala tishirt Fluid structure meets bold tailoring. A statement in modern minimalism. Fluid structure meets bold tailoring. A statement in modern minimalism.",
  sizes: ["S", "M", "L", "XL"],
  colors: ["black", "blue", "gray", "brown"],
};

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.mainInfoWrapper}>
        <div className={styles.mainImageWrapper}>
          <Image
            src={product.image}
            width={535}
            height={800}
            alt={product.name}
          />
        </div>

        <div className={styles.mainInfoContent}>
          <div className={styles.mainInfo}>
            <div className={styles.titlesWrapper}>
              <h1 className={styles.heading2}>{product.name}</h1>
              <p className={styles.description}>{product.description}</p>
            </div>

            <p className={styles.heading3}>{product.price} USD</p>

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
              <button className={styles.addToCartButton}>ADD TO CART</button>
            </div>
          </div>
          <div className={styles.informationWrapper}>
            <InformationCard
              title="What's your return policy?"
              description="Items can be exchanged for another product within 14 days."
            />
            <InformationCard
              title="How long does shipping take?"
              description="Shipping is immediate or within 4 days if in stock. Out-of-stock items may require a few extra days."
            />
            <InformationCard
              title="How is the product delivered?"
              description="We deliver items via courier directly to your home. Shipping costs are not included in the product price and will vary depending on your location."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
