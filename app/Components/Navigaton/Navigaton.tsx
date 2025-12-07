"use client";
import styles from "./Navigaton.module.scss";
import { BsCart4 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import NavItems from "./Components/NavItems/NavItems";
import { useState } from "react";
import Clock from "./Components/Clock/Clock";
import AsideCart from "../AsideCart/AsideCart";
import { useRouter } from "next/navigation";
import { useCartRef } from "@/app/Context/CartRefContext";
import { useCart } from "@/app/Context/CartContext";

const Navigaton = () => {
  const [showNavItems, setShowNavItems] = useState(false);

  const router = useRouter();
  const cartRef = useCartRef();
  const { toggleCart, isCartOpen, closeCart } = useCart();
  return (
    <div className={styles.navWrapper}>
      <div className={styles.navContent}>
        <nav className={styles.nav}>
          <div onClick={() => router.push("/")} className={styles.logo}>
            <p className={styles.logoText}>ENDOPAIL</p>
          </div>

          <div className={styles.navItemsRight}>
            <div className={styles.timeWrapper}>
              <Clock />
            </div>
            <div onClick={() => setShowNavItems((prev) => !prev)}>
              <div className={styles.burgerMenu}>
                <RxHamburgerMenu />
              </div>
            </div>
            <div>
              <div
                className={styles.cartIcon}
                onClick={toggleCart}
                ref={cartRef}
              >
                <BsCart4 />
              </div>
            </div>
          </div>
        </nav>

        <AsideCart isOpen={isCartOpen} onClose={closeCart} />
        <NavItems
          isOpen={showNavItems}
          onClose={() => setShowNavItems(false)}
        />
      </div>
    </div>
  );
};

export default Navigaton;
