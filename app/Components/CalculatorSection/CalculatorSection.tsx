import styles from "./CalculatorSection.module.scss";
import { FaBone } from "react-icons/fa6";
import { PiBoneFill } from "react-icons/pi";
import { FaCalculator } from "react-icons/fa6";

import CardComponent from "./CardComponent/CardComponent";
import CalcFooter from "./CalcFooter/CalcFooter";
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
      <div className={styles.calculatorsSection}>
        <h3 className={styles.title}>Endocrinology Calculators</h3>
        <div className={styles.divider}>
          <p className={styles.subTitle}>
            Professional medical calculators designed for healthcare providers
            to
          </p>
          <p className={styles.subTitle}>
            support clinical decision-making in endocrinology
          </p>
        </div>
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

      <div className={styles.buttonWrapper}>
        <button
          className={styles.exploreAllButton}
          onClick={() => router.push("/calculators")}
        >
          <FaCalculator color="white" />
          <p>Explore All Calculators</p>
        </button>
        <p className={styles.buttonSubtitle}>
          Access our complete suite of endocrinology calculation tools
        </p>
      </div>

      <CalcFooter />
    </div>
  );
};

export default CalculatorSection;
