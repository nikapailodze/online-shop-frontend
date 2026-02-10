import styles from "./CalculatorSection.module.scss";
import { FaBone } from "react-icons/fa6";
import { PiBoneFill } from "react-icons/pi";

import CardComponent from "./CardComponent/CardComponent";
import { useRouter } from "next/navigation";
const calculators = [
  {
    id: 1,
    name: "Diabetes Risk Score",
    description: "Assess patient risk for developing diabetes",
    icon: PiBoneFill ,
    color: "text-[var(--color-primary)]",
  },
  {
    id: 2,
    name: "BMI & Obesity Risk",
    description: "Calculate body mass index and obesity classification",
    icon: FaBone,
    color: "text-[var(--color-primary)]",
  },
  {
    id: 3,
    name: "Thyroid Function Index",
    description: "Evaluate thyroid hormone levels and function",
    icon: FaBone,
    color: "text-[var(--color-primary)]",
  },
  {
    id: 4,
    name: "Diabetes Risk Score",
    description: "Assess patient risk for developing diabetes",
    icon: PiBoneFill,
    color: "text-[var(--color-primary)]",
  },
  {
    id: 5,
    name: "BMI & Obesity Risk",
    description: "Calculate body mass index and obesity classification",
    icon: FaBone,
    color: "text-[var(--color-primary)]",
  },
  {
    id: 6,
    name: "Thyroid Function Index",
    description: "Evaluate thyroid hormone levels and function",
    icon: FaBone,
    color: "text-[var(--color-primary)]",
  },
];

const CalculatorSection = () => {
  const router = useRouter();
  return (
    <div className={styles.calculatorSectionWrapper}>
      <div className={styles.buttonRow}>
        <h3 className={styles.sectionHeading}>Endocrinology Calculators</h3>
        <button
          className={styles.exploreAllLink}
          onClick={() => router.push("/calculators")}
        >
          Explore all calculators
        </button>
      </div>

      <div className={styles.cardsContainer}>
        {calculators.map((calculator) => (
          <CardComponent
            key={calculator.id}
            icon={calculator.icon}
            title={calculator.name}
            subTitle={calculator.description}
          />
        ))}
      </div>

    </div>
  );
};

export default CalculatorSection;
