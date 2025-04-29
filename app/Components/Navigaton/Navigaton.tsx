import styles from "./Navigaton.module.scss";
import { BsCart4 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
const Navigaton = () => {
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <p className={styles.logoText}>VAER</p>
        </div>

        <div className={styles.navItemsRight}>
          <div className={styles.timeWrapper}>
            <p>12:00:08</p>
          </div>
          <div>
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
    </div>
  );
};

export default Navigaton;
