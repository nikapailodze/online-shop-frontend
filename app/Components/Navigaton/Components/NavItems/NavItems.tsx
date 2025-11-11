import Link from 'next/link';
import styles from './NavItems.module.scss';

interface NavItemsProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavItems = ({ isOpen, onClose }: NavItemsProps) => {
  const onNavItemClick = () => {
    onClose();
  };

  return (
    <div className={`${styles.navItems} ${isOpen ? styles.open : styles.closed}`}>
      <ul className={styles.list}>
        <li onClick={onNavItemClick} className={styles.listItem}>
          <Link href="/" className={styles.listItem}>Home</Link>
        </li>
        <li onClick={onNavItemClick} className={styles.listItem}>
          <Link href="/shop" className={styles.listItem}>Shop</Link>
        </li>
        <li onClick={onNavItemClick} className={styles.listItem}>
          <Link href="/calculators" className={styles.listItem}>Calculators</Link>
        </li>
        <li onClick={onNavItemClick} className={styles.listItem}>
          <Link href="/about-vaer" className={styles.listItem}>About ENDOPIE</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavItems;
