import { ReactNode } from "react";
import styles from "./CardComponent.module.scss";

interface CardComponentProps {
  iconSrc: ReactNode;
  title: string;
  subTitle: string;
}
const CardComponent = (props: CardComponentProps) => {
  return (
    <div className={styles.container}>
      <div>
        {props.iconSrc}
      </div>
      <div>
        <span className={styles.title}>{props.title}</span>
        <p className={styles.subTitle}>{props.subTitle}</p>
      </div>
    </div>
  );
};

export default CardComponent;
