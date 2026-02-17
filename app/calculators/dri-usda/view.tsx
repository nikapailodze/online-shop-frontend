"use client";

import React, { useMemo, useState } from "react";
import styles from "../page.module.scss";
import SectionCard from "../components/SectionCard/SectionCard";
import RadioGroup from "../components/RadioGroup/RadioGroup";
import UnitNumberInput from "../components/UnitNumberInput/UnitNumberInput";
import Collapsible from "../components/Collapsible/Collapsible";
import { computeDriUsda } from "./compute";

export default function DriUsdaView() {
  const [sex, setSex] = useState<"female" | "male">("female");
  const [ageYears, setAgeYears] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [activityLevel, setActivityLevel] = useState<
    "sedentary" | "low_active" | "active" | "very_active"
  >("sedentary");

  const result = useMemo(
    () =>
      computeDriUsda({
        ageYears,
        sex,
        weightKg,
        heightCm,
        activityLevel,
      }),
    [ageYears, sex, weightKg, heightCm, activityLevel]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>USDA DRI Calculator (Adults)</div>
          <div className={styles.subtitle}>
            Estimates energy and macronutrient targets from DRI equations.
          </div>
        </div>

        <div className={styles.grid}>
          <SectionCard title="Input">
            <div className={styles.stack}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Sex</div>
                <RadioGroup
                  name="Sex"
                  value={sex}
                  onChange={(v) => setSex(v as "female" | "male")}
                  options={[
                    { value: "female", label: "Female" },
                    { value: "male", label: "Male" },
                  ]}
                  columns={2}
                />
              </div>

              <UnitNumberInput
                id="ageYears"
                label="Age"
                value={ageYears}
                onChange={setAgeYears}
                placeholder="E.g. 34"
                unit="years"
              />

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="weightKg"
                  label="Weight"
                  value={weightKg}
                  onChange={setWeightKg}
                  placeholder="E.g. 68"
                  unit="kg"
                />
                <UnitNumberInput
                  id="heightCm"
                  label="Height"
                  value={heightCm}
                  onChange={setHeightCm}
                  placeholder="E.g. 172"
                  unit="cm"
                />
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  Physical activity
                </div>
                <RadioGroup
                  name="Activity level"
                  value={activityLevel}
                  onChange={(v) =>
                    setActivityLevel(
                      v as "sedentary" | "low_active" | "active" | "very_active"
                    )
                  }
                  options={[
                    { value: "sedentary", label: "Sedentary" },
                    { value: "low_active", label: "Low active" },
                    { value: "active", label: "Active" },
                    { value: "very_active", label: "Very active" },
                  ]}
                  columns={2}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Results">
            <div className={styles.stack}>
              <ResultRow
                title="BMI"
                value={
                  result.complete ? `${result.bmi?.toFixed(1)} (${result.bmiBand})` : "—"
                }
              />
              <ResultRow
                title="Estimated Energy Requirement (kcal/day)"
                value={result.complete ? `${Math.round(result.eerKcal ?? 0)}` : "—"}
              />
              <ResultRow
                title="Carbohydrate range (g/day)"
                value={
                  result.complete && result.carbRangeG
                    ? `${Math.round(result.carbRangeG.min)} - ${Math.round(result.carbRangeG.max)}`
                    : "—"
                }
              />
              <ResultRow
                title="Protein range (g/day)"
                value={
                  result.complete && result.proteinRangeG
                    ? `${Math.round(result.proteinRangeG.min)} - ${Math.round(result.proteinRangeG.max)}`
                    : "—"
                }
              />
              <ResultRow
                title="Fat range (g/day)"
                value={
                  result.complete && result.fatRangeG
                    ? `${Math.round(result.fatRangeG.min)} - ${Math.round(result.fatRangeG.max)}`
                    : "—"
                }
              />
              <ResultRow
                title="Total water AI (L/day)"
                value={result.complete ? `${result.waterLiters?.toFixed(1)}` : "—"}
              />

              {result.complete && !result.supportedAge ? (
                <div className={`${styles.divider} ${styles.small}`}>
                  This implementation currently supports adults 19+ years.
                </div>
              ) : null}

              <Collapsible title="Notes & Equations used">
                <div className={styles.small}>
                  <p>
                    EER equations use sex-specific IOM/DRI adult formulas and
                    physical activity coefficients.
                  </p>
                  <p>Macronutrient ranges use AMDR: carbs 45-65%, protein 10-35%, fat 20-35%.</p>
                  <p>Total water AI shown: women 2.7 L/day, men 3.7 L/day.</p>
                  <p>
                    For the full USDA DRI nutrient calculator, use:
                    {" "}
                    <a
                      href="https://www.nal.usda.gov/human-nutrition-and-food-safety/dri-calculator"
                      target="_blank"
                      rel="noreferrer"
                    >
                      USDA DRI Calculator
                    </a>
                  </p>
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}

function ResultRow(props: { title: string; value: string }) {
  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        background: "#fbfbff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        fontWeight: 600,
      }}
    >
      <span>{props.title}</span>
      <span>{props.value}</span>
    </div>
  );
}

