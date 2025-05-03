import React from "react";
import styles from "./AsideCart.module.scss";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
interface AsideCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color: string;
    size: string;
  }[];
}

const AsideCart: React.FC<AsideCartProps> = ({ isOpen, onClose, items }) => {
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={`${styles.asideCart} ${isOpen ? styles.open : ""}`}>
      <div className={styles.asideCartHeader}>
        <h2 className={styles.bodyheading}>
          {items.length === 0
            ? `Your Cart is empty`
            : `${items.length} items in cart`}
        </h2>
        <button onClick={onClose} className={styles.closeButton}>
          <IoMdClose size={24} />
        </button>
      </div>
      <div className={styles.cartItemsWrapper}>
        {items.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <Image
              src={item.image}
              alt={item.name}
              width={140}
              height={160}
              className={styles.cartItemImage}
            />

            <div className={styles.cartItemDetails}>
              <div className={styles.cartItemMainInfo}>
                <h3>{item.name}</h3>
                <p>{item.price.toFixed(2)}USD</p>
              </div>

              <div className={styles.cartItemFooter}>
                <div className={styles.quantitiesWrapper}>
                  <button className={styles.minusbutton}>
                    <AiOutlineMinus size={17} />
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button className={styles.plusbutton}>
                    <GoPlus size={20} />
                  </button>
                </div>

                <button className={styles.cartItemCloseButton}>
                  <IoMdClose color="white" size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.asideCartFooter}>
        <div className={styles.totalPriceWrapper}>
          <h3>Subtotal</h3>
          <span className={styles.finalPrice}>{totalPrice.toFixed(2)}</span>
        </div>
        <div className={styles.btns}>
          <button className={styles.checkoutBtn}>Checkout</button>
          <button className={styles.clearCartButton}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

export default AsideCart;
