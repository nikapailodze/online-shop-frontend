import React from "react";
import Image from "next/image";
import styles from "./ShoppingItem.module.scss";
import { useRouter } from "next/navigation";
interface ShoppingItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({
  name,
  description,
  price,
  imageUrl,
  id,
}) => {

  const router = useRouter()

  const handleClick = () => {
    router.push(`/proditempage/${id}`);
  };
  return (
    <div  onClick={handleClick} className={styles.shoppingItemContianer}>
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
          <p className={styles.heading3}>{price.toFixed(2)} GEL</p>
        </div>
        <p className={styles.itemDescription}>{description}</p>
      </div>
    </div>
  );
};

export default ShoppingItem;
