import styles from "./CardComponent.module.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { Fragment } from "react";
import { IconType } from "react-icons/lib";
import { useLanguage } from "@/app/Context/LanguageContext";
import { translateText } from "@/app/lib/translate";

interface CardComponentProps {
  icon?: IconType;
  title: string;
  subTitle: string;
  slug?: string;
  highlightQuery?: string;
}
const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text: string, query: string, className: string) => {
  const q = query.trim();
  if (!q) return text;

  const pattern = new RegExp(`(${escapeRegExp(q)})`, "ig");
  const parts = text.split(pattern);
  if (parts.length === 1) return text;

  const lowerQuery = q.toLowerCase();
  return parts.map((part, index) =>
    part.toLowerCase() === lowerQuery ? (
      <span key={`${part}-${index}`} className={className}>
        {part}
      </span>
    ) : (
      <Fragment key={`${part}-${index}`}>{part}</Fragment>
    )
  );
};

const CardComponent = ({ icon: Icon, title, subTitle, slug, highlightQuery = "" }: CardComponentProps)=> {
  const { language } = useLanguage();

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.iconContainer}>{Icon ? <Icon size={32} /> : null}</div>
        <div className={styles.textContainer}>
          <span className={styles.title}>
            {highlightText(title, highlightQuery, styles.highlight)}
          </span>
          <p className={styles.subTitle}>
            {highlightText(subTitle, highlightQuery, styles.highlight)}
          </p>
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
