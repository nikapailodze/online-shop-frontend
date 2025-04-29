import React from "react";
import Image from "next/image";
import styles from "./ShoppingItem.module.scss";
interface ShoppingItemProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  //   onAddToCart: () => void;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({
  name,
  description,
  price,
  imageUrl,
}) => {
  return (
    <div className={styles.shoppingItemContianer}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={name}
          width={347}
          height={450}
          className={styles.responsiveImage}
        />
      </div>

      <div className={styles.infoWrapper}>
        <div className={styles.shoppingItemContent}>
          <h3 className={styles.heading3}>{name}</h3>
          <p className={styles.heading3}>{price.toFixed(2)} USD</p>
        </div>
        <p className={styles.itemDescription}>{description}</p>
      </div>
    </div>
  );
};

export default ShoppingItem;
