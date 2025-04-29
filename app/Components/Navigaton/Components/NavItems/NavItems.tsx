import styles from './NavItems.module.scss';

const NavItems = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className={`${styles.navItems} ${isOpen ? styles.open : styles.closed}`}>
      <ul className={styles.list}>
        <li className={styles.listItem}>Home</li>
        <li className={styles.listItem}>Shop</li>
        <li className={styles.listItem}>About VAER</li>
      </ul>
    </div>
  );
};

export default NavItems;
