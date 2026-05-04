"use client";

import styles from "../page.module.css";
import {
  calculatorCategoryOptions,
  type CalculatorFormState,
} from "../types";

type Props = {
  editingCalculatorId: number | null;
  calculatorForm: CalculatorFormState;
  calculatorError: string | null;
  isSubmittingCalculator: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  setCalculatorForm: React.Dispatch<React.SetStateAction<CalculatorFormState>>;
  onFieldChange: (
    index: number,
    key:
      | "name"
      | "label"
      | "type"
      | "unit"
      | "placeholder"
      | "defaultValue"
      | "options",
    value: string,
  ) => void;
  onAddField: () => void;
  onRemoveField: (index: number) => void;
};

export default function CalculatorEditorCard({
  editingCalculatorId,
  calculatorForm,
  calculatorError,
  isSubmittingCalculator,
  onSubmit,
  onCancel,
  setCalculatorForm,
  onFieldChange,
  onAddField,
  onRemoveField,
}: Props) {
  return (
    <div className={styles.card}>
      <h2>{editingCalculatorId !== null ? "Edit calculator" : "Create calculator"}</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          placeholder="Title"
          required
          value={calculatorForm.title}
          onChange={(event) =>
            setCalculatorForm((current) => ({
              ...current,
              title: event.target.value,
            }))
          }
        />
        <input
          className={styles.input}
          placeholder="Slug (optional)"
          value={calculatorForm.slug}
          onChange={(event) =>
            setCalculatorForm((current) => ({
              ...current,
              slug: event.target.value,
            }))
          }
        />
        <input
          className={styles.input}
          placeholder="Short description"
          required
          value={calculatorForm.short}
          onChange={(event) =>
            setCalculatorForm((current) => ({
              ...current,
              short: event.target.value,
            }))
          }
        />
        <select
          className={styles.input}
          value={calculatorForm.category}
          onChange={(event) =>
            setCalculatorForm((current) => ({
              ...current,
              category: event.target.value,
            }))
          }
        >
          {calculatorCategoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <textarea
          className={styles.textarea}
          placeholder="Description"
          value={calculatorForm.description}
          onChange={(event) =>
            setCalculatorForm((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
        />
        <input
          className={styles.input}
          placeholder="Result label"
          value={calculatorForm.resultLabel}
          onChange={(event) =>
            setCalculatorForm((current) => ({
              ...current,
              resultLabel: event.target.value,
            }))
          }
        />
        <textarea
          className={styles.textarea}
          placeholder="Formula, e.g. weight / ((height / 100) * (height / 100))"
          required
          value={calculatorForm.formula}
          onChange={(event) =>
            setCalculatorForm((current) => ({
              ...current,
              formula: event.target.value,
            }))
          }
        />
        <select
          className={styles.input}
          value={calculatorForm.status}
          onChange={(event) =>
            setCalculatorForm((current) => ({
              ...current,
              status: event.target.value as "draft" | "published",
            }))
          }
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <div className={styles.fieldBuilder}>
          <div className={styles.fieldBuilderHeader}>
            <strong>Calculator fields</strong>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={onAddField}
            >
              Add field
            </button>
          </div>

          {calculatorForm.fields.map((field, index) => (
            <div key={`${index}-${field.name}`} className={styles.fieldRow}>
              <input
                className={styles.input}
                placeholder="Field name, e.g. weight"
                value={field.name}
                onChange={(event) => onFieldChange(index, "name", event.target.value)}
              />
              <input
                className={styles.input}
                placeholder="Label"
                value={field.label}
                onChange={(event) => onFieldChange(index, "label", event.target.value)}
              />
              <select
                className={styles.input}
                value={field.type}
                onChange={(event) => onFieldChange(index, "type", event.target.value)}
              >
                <option value="number">Number</option>
                <option value="select">Select</option>
                <option value="boolean">Yes / No</option>
              </select>
              <input
                className={styles.input}
                placeholder="Unit"
                value={field.unit}
                onChange={(event) => onFieldChange(index, "unit", event.target.value)}
              />
              <input
                className={styles.input}
                placeholder="Placeholder"
                value={field.placeholder}
                onChange={(event) => onFieldChange(index, "placeholder", event.target.value)}
              />
              <input
                className={styles.input}
                placeholder="Default value"
                value={field.defaultValue}
                onChange={(event) => onFieldChange(index, "defaultValue", event.target.value)}
              />
              {field.type === "select" ? (
                <textarea
                  className={styles.textarea}
                  placeholder={"Options: Male=1\nFemale=0"}
                  value={field.options
                    .map((option) => `${option.label}=${option.value}`)
                    .join("\n")}
                  onChange={(event) =>
                    onFieldChange(index, "options", event.target.value)
                  }
                />
              ) : null}
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => onRemoveField(index)}
              >
                Remove field
              </button>
            </div>
          ))}
        </div>

        {calculatorError ? <p className={styles.error}>{calculatorError}</p> : null}
        <div className={styles.actions}>
          <button className={styles.button} type="submit" disabled={isSubmittingCalculator}>
            {isSubmittingCalculator
              ? editingCalculatorId !== null
                ? "Saving..."
                : "Creating..."
              : editingCalculatorId !== null
                ? "Save calculator"
                : "Create calculator"}
          </button>
          {editingCalculatorId !== null ? (
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={onCancel}
              disabled={isSubmittingCalculator}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
