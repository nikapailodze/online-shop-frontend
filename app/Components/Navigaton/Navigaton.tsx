import styles from "./Navigaton.module.scss";
import { BsCart4 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import NavItems from "../NavItems/NavItems";
import { useState } from "react";

const Navigaton = () => {
  const [showNavItems, setShowNavItems] = useState(false);

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <p className={styles.logoText}>VAER</p>
        </div>

        <div className={styles.navItemsRight}>
          <div className={styles.timeWrapper}>
            <p>12:00:08</p>
          </div>
          <div onClick={() => setShowNavItems((prev) => !prev)}>
            <div className={styles.burgerMenu}>
              <RxHamburgerMenu />
            </div>
          </div>
          <div>
            <div className={styles.cartIcon}>
              <BsCart4 />
            </div>
          </div>
        </div>
      </nav>

      {/* Always render NavItems and toggle its className */}
      <NavItems isOpen={showNavItems} />
    </div>
  );
};

export default Navigaton;
