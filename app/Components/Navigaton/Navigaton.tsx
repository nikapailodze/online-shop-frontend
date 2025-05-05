"use client";
import styles from "./Navigaton.module.scss";
import { BsCart4 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import NavItems from "./Components/NavItems/NavItems";
import { useState } from "react";
import Clock from "./Components/Clock/Clock";
import AsideCart from "../AsideCart/AsideCart";
import { useRouter } from "next/navigation";

const Navigaton = () => {
  const [showNavItems, setShowNavItems] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const router = useRouter();

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navContent}>

      <nav className={styles.nav}>
        <div onClick={()=>router.push('/')} className={styles.logo}>
          <p className={styles.logoText}>VAER</p>
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
          { id: 1, name: "Product 1", price: 10.99, quantity: 1, image: "/tralaleoShirt.png", color: "red", size: "M" },
          { id: 2, name: "Product 2", price: 15.49, quantity: 2, image: "/tralaleoShirt.png", color: "blue", size: "L" },
          { id: 3, name: "Product 3", price: 7.99, quantity: 1, image: "/tralaleoShirt.png", color: "green", size: "S" },
          { id: 4, name: "Product 3", price: 7.99, quantity: 1, image: "/tralaleoShirt.png", color: "green", size: "S" },
          { id: 5, name: "Product 3", price: 7.99, quantity: 1, image: "/tralaleoShirt.png", color: "green", size: "S" },
          { id: 6, name: "Product 2", price: 15.49, quantity: 2, image: "/tralaleoShirt.png", color: "blue", size: "L" },

        ]}
      />
      <NavItems isOpen={showNavItems} />
      </div>
    </div>
  );
};

export default Navigaton;
