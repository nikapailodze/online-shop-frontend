import React from "react";
import styles from "./AsideCart.module.scss";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
}

interface AsideCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

const AsideCart: React.FC<AsideCartProps> = ({ isOpen, onClose, items }) => {
  const [itemsArray, setItems] = React.useState<CartItem[]>(items);

  const totalPrice = itemsArray.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const onPlusClick = (itemId: number) => {
    const updatedItems = itemsArray.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
  };

  const onMinusClick = (itemId: number) => {
    const updatedItems = itemsArray.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setItems(updatedItems);
  };

  const onDeleteButtonClick = (itemId: number) => {
    const filteredItems = itemsArray.filter((item) => item.id !== itemId);
    setItems(filteredItems);
  };

  const onClearCartClick = () => {
    setItems([]);
  };

  return (
    <div className={`${styles.asideCart} ${isOpen ? styles.open : ""}`}>
      <div className={styles.asideCartHeader}>
        <h2 className={styles.bodyheadingTitle}>
          {itemsArray.length === 0
            ? `Your Cart is empty`
            : `${itemsArray.length} items in cart`}
        </h2>
        <button onClick={onClose} className={styles.closeButton}>
          <IoMdClose size={24} />
        </button>
      </div>

      <div className={styles.cartItemsWrapper}>
        {itemsArray.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <Image
              src={item.image}
              alt={item.name}
              width={140}
              height={160}
              className={styles.cartItemImage}
            />

            <div className={styles.cartItemDetails}>
              <div className={styles.cartItemHeader}>
                <div className={styles.cartItemMainInfo}>
                  <h3 className={styles.itemTitle}>{item.name}</h3>
                  <p className={styles.itemTitle}>
                    {item.price.toFixed(2)} GEL
                  </p>
                </div>

                {item.color && (
                  <div className={styles.cartItemColor}>
                    <span className={styles.itemTitle}>Color:</span>
                    <span className={styles.itemColortext}>{item.color}</span>
                  </div>
                )}
              </div>

              <div className={styles.cartItemFooter}>
                <div className={styles.quantitiesWrapper}>
                  <button
                    onClick={() => onMinusClick(item.id)}
                    className={styles.minusbutton}
                  >
                    <AiOutlineMinus size={17} />
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => onPlusClick(item.id)}
                    className={styles.plusbutton}
                  >
                    <GoPlus size={20} />
                  </button>
                </div>

                <button
                  className={styles.cartItemCloseButton}
                  onClick={() => onDeleteButtonClick(item.id)}
                >
                  <IoMdClose color="white" size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.asideCartFooter}>
        <div className={styles.totalPriceWrapper}>
          <h3 className={styles.bodyheading}>Subtotal</h3>
          <span className={styles.bodyheading}>
            {totalPrice.toFixed(2)} GEL
          </span>
        </div>
        <div className={styles.btns}>
          <button className={styles.checkoutBtn}>Checkout</button>
          <button onClick={onClearCartClick} className={styles.clearCartButton}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AsideCart;
