import { ReactNode } from "react";
import styles from "./CardComponent.module.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


interface CardComponentProps {
  iconSrc: ReactNode;
  title: string;
  subTitle: string;
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
      <a className={styles.calculatorLink} href="#" tabIndex={0}>
        
        <p>Open calculator </p> <div><MdOutlineKeyboardArrowRight /></div>
      </a>
    </div>
  );
};

export default CardComponent;
