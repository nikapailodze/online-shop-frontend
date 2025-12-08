"use client";
import React, { useState, useMemo } from "react";
import styles from "@/app/calculators/page.module.scss";
import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import RadioGroup from "@/app/calculators/components/RadioGroup/RadioGroup";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import CheckboxRow from "@/app/calculators/components/CheckboxRow/CheckboxRow";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";
import RiskScoreCard from "@/app/calculators/components/RiskScoreCard/RiskScoreCard";
import { computeDiabetesRisk } from "./compute";


export default function DiabetesRiskView() {
  const [age, setAge] = useState("-1");
  const [sex, setSex] = useState("-1");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [physicallyActive, setPhysicallyActive] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [familyHistory, setFamilyHistory] = useState(false);

  const { bmi, bmiPts, riskScore } = useMemo(
    () =>
      computeDiabetesRisk({
        age,
        sex,
        weight,
        height,
        physicallyActive,
        hypertension,
        familyHistory,
      }),
    [age, sex, weight, height, physicallyActive, hypertension, familyHistory]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Diabetes Risk Calculator</div>
          <div className={styles.subtitle}>
            Assess your diabetes risk with this clinical screening tool
          </div>
        </div>

        <div className={styles.grid}>
          {}
          <SectionCard title="Input">
            <div className={styles.stack}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Age</div>
                <RadioGroup
                  name="age"
                  value={age}
                  onChange={setAge}
                  options={[
                    { value: "0", label: "Under 40 years (0)" },
                    { value: "1", label: "40–49 years (1)" },
                    { value: "2", label: "50–59 years (2)" },
                    { value: "3", label: "≥60 years (3)" },
                  ]}
                  columns={1}
                />
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Sex</div>
                <RadioGroup
                  name="sex"
                  value={sex}
                  onChange={setSex}
                  options={[
                    { value: "0", label: "Female (0)" },
                    { value: "1", label: "Male (1)" },
                  ]}
                  columns={2}
                />
              </div>

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="weight"
                  label="Weight"
                  value={weight}
                  onChange={setWeight}
                  placeholder="E.g. 70"
                  unit="kg"
                />
                <UnitNumberInput
                  id="height"
                  label="Height"
                  value={height}
                  onChange={setHeight}
                  placeholder="E.g. 170"
                  unit="cm"
                />
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  Health Factors
                </div>
                <div className={styles.stack}>
                  <CheckboxRow
                    id="active"
                    label="Physically active"
                    checked={physicallyActive}
                    onChange={setPhysicallyActive}
                    badge="-1"
                    badgeTone="green"
                  />
                  <CheckboxRow
                    id="htn"
                    label="History of hypertension"
                    checked={hypertension}
                    onChange={setHypertension}
                    badge="+1"
                    badgeTone="orange"
                  />
                  <CheckboxRow
                    id="fmh"
                    label="Family history of diabetes"
                    checked={familyHistory}
                    onChange={setFamilyHistory}
                    badge="+1"
                    badgeTone="orange"
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {}
          <SectionCard title="Results">
            <div className={styles.stack}>
              <div className={styles.stack}>
                <div className={styles.stack}>
                  <SimpleRow
                    title="BMI"
                    value={bmi == null ? "—" : bmi.toFixed(1)}
                  />
                  <SimpleRow
                    title="BMI Points"
                    value={bmi == null ? "—" : String(bmiPts)}
                  />
                </div>
              </div>

              <RiskScoreCard score={riskScore} />

              <div className={`${styles.divider} ${styles.small}`}>
                <p>
                  A diabetes risk score of <strong>4+</strong> indicates
                  increased risk of pre-diabetes or undiagnosed diabetes.
                </p>
                <p>
                  A diabetes risk score of <strong>5+</strong> indicates
                  increased risk of undiagnosed diabetes.
                </p>
              </div>

              <Collapsible title="Equations used">
                <div className={styles.small}>
                  <p>
                    <strong>BMI</strong> = weight(kg) / [height(m)]²
                  </p>
                  <p>
                    <strong>BMI Points</strong> = 0 (&lt;25), 1 (25–29.9), 2
                    (30–34.9), 3 (35–39.9), 4 (≥40)
                  </p>
                  <p>
                    <strong>Diabetes Risk Score</strong> = BMI Points + Age +
                    Sex + FMH + Active + HTN
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

function SimpleRow(props: { title: string; value: string }) {
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
        fontWeight: 600,
      }}
    >
      <span>{props.title}</span>
      <span>{props.value}</span>
    </div>
  );
}
