import Link from 'next/link';
import styles from './NavItems.module.scss';
import { useLanguage } from '@/app/Context/LanguageContext';

interface NavItemsProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavItems = ({ isOpen, onClose }: NavItemsProps) => {
  const { language } = useLanguage();

  const labels = {
    home: language === "en" ? "Home" : "მთავარი",
    shop: language === "en" ? "Shop" : "მაღაზია",
    blogs: language === "en" ? "Blogs" : "ბლოგები",
    calculators: language === "en" ? "Calculators" : "კალკულატორები",
    consultation: language === "en" ? "Consultation" : "კონსულტაცია",
    profile: language === "en" ? "Profile" : "პროფილი",
    about: language === "en" ? "About ENDOPAIL" : "ENDOPAIL-ის შესახებ",
  };

  const onNavItemClick = () => {
    onClose();
  };

  return (
    <div className={`${styles.navItems} ${isOpen ? styles.open : styles.closed}`}>
      <ul className={styles.list}>
        <li onClick={onNavItemClick} className={styles.listItem}>
          <Link href="/" className={styles.listItem}>{labels.home}</Link>
        </li>
        <li onClick={onNavItemClick} className={styles.listItem}>
          <Link href="/shop" className={styles.listItem}>{labels.shop}</Link>
        </li>
        <li onClick={onNavItemClick} className={styles.listItem}>
          <Link href="/blogs" className={styles.listItem}>{labels.blogs}</Link>
        </li>
        <li onClick={onNavItemClick} className={styles.listItem}>
          <Link href="/calculators" className={styles.listItem}>{labels.calculators}</Link>
        </li>
        <li onClick={onNavItemClick} className={styles.listItem}>
          <Link href="/consultation" className={styles.listItem}>{labels.consultation}</Link>
        </li>
        <li onClick={onNavItemClick} className={styles.listItem}>
          <Link href="/profile" className={styles.listItem}>{labels.profile}</Link>
        </li>
        <li onClick={onNavItemClick} className={styles.listItem}>
          <Link href="/about-endopail" className={styles.listItem}>{labels.about}</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavItems;
