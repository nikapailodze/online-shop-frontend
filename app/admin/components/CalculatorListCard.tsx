import styles from "../page.module.css";
import type { Calculator } from "../types";

type Props = {
  calculators: Calculator[];
  deletingCalculatorId: number | null;
  onEdit: (calculator: Calculator) => void;
  onDelete: (calculatorId: number) => void;
};

export default function CalculatorListCard({
  calculators,
  deletingCalculatorId,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className={styles.card}>
      <h2>Calculators</h2>
      <div className={styles.list}>
        {calculators.map((calculator) => (
          <div key={calculator.id} className={styles.listItem}>
            <strong>{calculator.title}</strong>
            <span>
              {calculator.category} • {calculator.status}
            </span>
            <span>{calculator.short}</span>
            <span>{calculator.fields.length} fields</span>
            <div className={styles.actions}>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => onEdit(calculator)}
              >
                Edit
              </button>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => onDelete(calculator.id)}
                disabled={deletingCalculatorId === calculator.id}
              >
                {deletingCalculatorId === calculator.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
        {calculators.length === 0 ? <p>No custom calculators yet.</p> : null}
      </div>
    </div>
  );
}
