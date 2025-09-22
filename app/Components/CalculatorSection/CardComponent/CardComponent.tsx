import { ReactNode } from "react";
import styles from "./CardComponent.module.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

interface CardComponentProps {
  iconSrc?: ReactNode;
  title: string;
  subTitle: string;
  slug?: string;
}
const CardComponent = (props: CardComponentProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.iconContainer}>{props.iconSrc}</div>
        <div>
          <span className={styles.title}>{props.title}</span>
          <p className={styles.subTitle}>{props.subTitle}</p>
        </div>
      </div>
      <Link
        href={`/calculators/${props.slug}`}
        className={styles.calculatorLink}
      >
        <p>Open calculator </p>{" "}
        <div>
          <MdOutlineKeyboardArrowRight />
        </div>
      </Link>
    </div>
  );
};

export default CardComponent;
