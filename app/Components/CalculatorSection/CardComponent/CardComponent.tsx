import styles from "./CardComponent.module.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

interface CardComponentProps {
  icon?: IconType;
  title: string;
  subTitle: string;
  slug?: string;
}
const CardComponent = ({ icon: Icon, title, subTitle, slug }: CardComponentProps)=> {
  const { language } = useLanguage();

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.iconContainer}>{Icon ? <Icon size={32} /> : null}</div>
        <div className={styles.textContainer}>
          <span className={styles.title}>{title}</span>
          <p className={styles.subTitle}>{subTitle}</p>
        </div>
      </div>
      <Link
        href={`/calculators/${slug}`}
        className={styles.calculatorLink}
      >
        <p>{translateText("Open calculator", language)}</p>{" "}
        <div>
          <MdOutlineKeyboardArrowRight />
        </div>
      </Link>
    </div>
  );
};

export default CardComponent;
