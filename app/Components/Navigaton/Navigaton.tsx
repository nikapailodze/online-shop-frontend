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

const Navigaton = () => {
  const [showNavItems, setShowNavItems] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const router = useRouter();
  const cartRef = useCartRef();
  return (
    <div className={styles.navWrapper}>
      <div className={styles.navContent}>
        <nav className={styles.nav}>
          <div onClick={() => router.push("/")} className={styles.logo}>
            <p className={styles.logoText}>ENDOPIE</p>
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
                onClick={() => setShowCart((prev) => !prev)}
                ref={cartRef}
              >
                <BsCart4 />
              </div>
            </div>
          </div>
        </nav>

        <AsideCart
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          items={[
            {
              id: 1,
              name: "Product 1",
              price: 10.99,
              quantity: 1,
              image: "/merch1.png",
              color: "red",
              size: "M",
            },
            {
              id: 2,
              name: "Product 2",
              price: 15.49,
              quantity: 2,
              image: "/merch2.png",
              color: "blue",
              size: "L",
            },
            {
              id: 3,
              name: "Product 3",
              price: 7.99,
              quantity: 1,
              image: "/merch3.png",
              color: "green",
              size: "S",
            },
            {
              id: 4,
              name: "Product 3",
              price: 7.99,
              quantity: 1,
              image: "/merch3.png",
              color: "green",
              size: "S",
            },
            {
              id: 5,
              name: "Product 3",
              price: 7.99,
              quantity: 1,
              image: "/merch3.png",
              color: "green",
              size: "S",
            },
            {
              id: 6,
              name: "Product 2",
              price: 15.49,
              quantity: 2,
              image: "/merch2.png",
              color: "blue",
              size: "L",
            },
          ]}
        />
        <NavItems
          isOpen={showNavItems}
          onClose={() => setShowNavItems(false)}
        />
      </div>
    </div>
  );
};

export default Navigaton;
