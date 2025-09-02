import styles from "./CalculatorSection.module.scss";
import { FaBone } from "react-icons/fa6";

import CardComponent from "./CardComponent/CardComponent";
const calculators = [
  {
    id: 1,
    name: "Diabetes Risk Score",
    description: "Assess patient risk for developing diabetes",
    icon: <FaBone />,
    color: "text-blue-600",
  },
  {
    id: 2,
    name: "BMI & Obesity Risk",
    description: "Calculate body mass index and obesity classification",
    icon: <FaBone />,
    color: "text-teal-600",
  },
  {
    id: 3,
    name: "Thyroid Function Index",
    description: "Evaluate thyroid hormone levels and function",
    icon: <FaBone />,
    color: "text-cyan-600",
  },
];

const CalculatorSection = () => {
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
            iconSrc={calculator.icon}
            title={calculator.name}
            subTitle={calculator.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CalculatorSection;
