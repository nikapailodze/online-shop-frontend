import React, { useRef, useState, useEffect } from "react";
import styles from "./InformationCard.module.scss";
import { GoPlus } from "react-icons/go";

interface InformationCardProps {
  title: string;
  description: string;
}

const InformationCard: React.FC<InformationCardProps> = ({
  title,
  description,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const descRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (descRef.current) {
      setHeight(isVisible ? `${descRef.current.scrollHeight}px` : "0px");
    }
  }, [isVisible]);

  return (
    <div className={styles.informationCard}>
      <div className={styles.informationCardTitleWrapper}>
        <h1 className={styles.heading3}>{title}</h1>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className={styles.informationCardButton}
        >
          <GoPlus
            size={24}
            color="currentColor"
            className={`${styles.informationCardIcon} ${
              isVisible ? styles.active : ""
            }`}
          />
        </button>
      </div>

      <div
        ref={descRef}
        className={`${styles.descriptionWrapper} ${
          isVisible ? styles.descriptionWrapperVisible : ""
        }`}
        style={{ height }}
      >
        <p className={styles.bodyheading}>{description}</p>
      </div>
    </div>
  );
};

export default InformationCard;
