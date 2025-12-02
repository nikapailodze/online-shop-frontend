import React, { useState } from "react";
import styles from "./AsideCart.module.scss";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useCart } from "@/app/Context/CartContext";

interface AsideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const AsideCart: React.FC<AsideCartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, clearCart, checkout, isLoading } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const onPlusClick = (itemId: number) => {
    const target = items.find((item) => item.id === itemId);
    if (target) {
      updateQuantity(itemId, target.quantity + 1);
    }
  };

  const onMinusClick = (itemId: number) => {
    const target = items.find((item) => item.id === itemId);
    if (target) {
      updateQuantity(itemId, Math.max(target.quantity - 1, 1));
    }
  };

  const onDeleteButtonClick = (itemId: number) => {
    removeItem(itemId);
  };

  const onClearCartClick = () => {
    clearCart();
  };

  const onCheckoutClick = async () => {
    if (!items.length) return;
    try {
      const result = await checkout();
      setCheckoutMessage(
        `Order #${result.orderId} placed. Total ${result.totalPrice.toFixed(2)} GEL.`
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to place the order.";
      setCheckoutMessage(message);
    }
  };

  return (
    <div className={`${styles.asideCart} ${isOpen ? styles.open : ""}`}>
      <div className={styles.asideCartHeader}>
        <h2 className={styles.bodyheadingTitle}>
          {items.length === 0 ? `Your Cart is empty` : `${items.length} items in cart`}
        </h2>
        <button onClick={onClose} className={styles.closeButton}>
          <IoMdClose size={24} />
        </button>
      </div>

      <div className={styles.cartItemsWrapper}>
        {items.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <Image
              src={item.imageUrl ?? "/merch1.png"}
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
          <button
            className={styles.checkoutBtn}
            disabled={!items.length || isLoading}
            onClick={onCheckoutClick}
          >
            {isLoading ? "Working..." : "Checkout"}
          </button>
          <button
            onClick={onClearCartClick}
            className={styles.clearCartButton}
            disabled={!items.length || isLoading}
          >
            Clear Cart
          </button>
        </div>
        {checkoutMessage && (
          <p className={styles.bodyheadingTitle}>{checkoutMessage}</p>
        )}
      </div>
    </div>
  );
};

export default AsideCart;
