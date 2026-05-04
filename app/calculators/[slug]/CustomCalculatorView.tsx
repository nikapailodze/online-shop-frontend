"use client";

import { useMemo, useState } from "react";
import type { ApiCalculator } from "@/app/lib/calculatorsApi";
import styles from "./CustomCalculatorView.module.css";

const supportedMath = {
  abs: Math.abs,
  ceil: Math.ceil,
  floor: Math.floor,
  max: Math.max,
  min: Math.min,
  pow: Math.pow,
  round: Math.round,
  sqrt: Math.sqrt,
};

const formatNumber = (value: number) => {
  if (!Number.isFinite(value)) return "Invalid result";
  return Number.isInteger(value)
    ? value.toString()
    : value.toFixed(4).replace(/\.?0+$/, "");
};

export default function CustomCalculatorView({
  calculator,
}: {
  calculator: ApiCalculator;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      calculator.fields.map((field) => [
        field.name,
        field.defaultValue == null
          ? field.type === "boolean"
            ? "0"
            : field.type === "select" && field.options?.[0]
              ? String(field.options[0].value)
              : ""
          : String(field.defaultValue),
      ]),
    ),
  );

  const evaluation = useMemo(() => {
    try {
      const args = calculator.fields.map((field) => {
        const raw = values[field.name];
        const numeric = Number(raw);
        return Number.isFinite(numeric) ? numeric : 0;
      });

      const executor = new Function(
        ...calculator.fields.map((field) => field.name),
        "abs",
        "ceil",
        "floor",
        "max",
        "min",
        "pow",
        "round",
        "sqrt",
        `return ${calculator.formula};`,
      );

      const result = executor(
        ...args,
        supportedMath.abs,
        supportedMath.ceil,
        supportedMath.floor,
        supportedMath.max,
        supportedMath.min,
        supportedMath.pow,
        supportedMath.round,
        supportedMath.sqrt,
      );

      return {
        value: typeof result === "number" ? result : Number(result),
        error: "",
      };
    } catch {
      return {
        value: Number.NaN,
        error: "Formula could not be evaluated.",
      };
    }
  }, [calculator.fields, calculator.formula, values]);

  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>{calculator.category}</p>
        <h1 className={styles.title}>{calculator.title}</h1>
        {calculator.description ? (
          <p className={styles.description}>{calculator.description}</p>
        ) : (
          <p className={styles.description}>{calculator.short}</p>
        )}

        <div className={styles.grid}>
          {calculator.fields.map((field) => (
            <label key={field.name} className={styles.field}>
              <span className={styles.label}>{field.label}</span>
              <span className={styles.inputWrap}>
                {field.type === "select" ? (
                  <select
                    className={styles.input}
                    value={values[field.name] ?? ""}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [field.name]: event.target.value,
                      }))
                    }
                  >
                    {(field.options ?? []).map((option) => (
                      <option key={`${option.label}-${option.value}`} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "boolean" ? (
                  <select
                    className={styles.input}
                    value={values[field.name] ?? "0"}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [field.name]: event.target.value,
                      }))
                    }
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                ) : (
                  <input
                    className={styles.input}
                    type="number"
                    inputMode="decimal"
                    value={values[field.name] ?? ""}
                    placeholder={field.placeholder || ""}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [field.name]: event.target.value,
                      }))
                    }
                  />
                )}
                {field.unit ? <span className={styles.unit}>{field.unit}</span> : null}
              </span>
            </label>
          ))}
        </div>

        <div className={styles.result}>
          <span className={styles.resultLabel}>{calculator.resultLabel}</span>
          <strong className={styles.resultValue}>
            {formatNumber(evaluation.value)}
          </strong>
          <span className={styles.formula}>Formula: {calculator.formula}</span>
          {evaluation.error ? <span className={styles.error}>{evaluation.error}</span> : null}
        </div>
      </section>
    </main>
  );
}
