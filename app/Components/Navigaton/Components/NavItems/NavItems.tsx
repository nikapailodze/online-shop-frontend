import Link from 'next/link';
import styles from './NavItems.module.scss';

const NavItems = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className={`${styles.navItems} ${isOpen ? styles.open : styles.closed}`}>
      <ul className={styles.list}>
        <li className={styles.listItem} >
            <Link href="/" className={styles.listItem} >Home</Link>
        </li>
        <li className={styles.listItem} style={{ listStyleType: 'none' }}>
          <Link className={styles.listItem} href="/shop">Shop</Link>
        </li>
        <li className={styles.listItem} style={{ listStyleType: 'none' }}>
          <Link className={styles.listItem} href="/about-vaer">About VAER</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavItems;
