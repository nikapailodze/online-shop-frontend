"use client";

import React, { useMemo, useState } from "react";
import styles from "./page.module.scss";
import SectionCard from "./Components/SectionCard/SectionCard";
import RadioGroup from "./Components/RadioGroup/RadioGroup";
import UnitNumberInput from "./Components/UnitNumberInput/UnitNumberInput";
import CheckboxRow from "./Components/CheckboxRow/CheckboxRow";
import RiskScoreCard from "./Components/RiskScoreCard/RiskScoreCard";
import Collapsible from "./Components/Collapsible/Collapsible";

export default function Page() {
  const [age, setAge] = useState("0"); // 0/1/2/3
  const [sex, setSex] = useState("0"); // 0 female / 1 male
  const [weight, setWeight] = useState(""); // kg
  const [height, setHeight] = useState(""); // cm
  const [physicallyActive, setPhysicallyActive] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [familyHistory, setFamilyHistory] = useState(false);

  // BMI in metric (kg / m^2) with robust parsing
  const bmi = useMemo(() => {
    const w = parseFloat((weight || "").toString().replace(",", ".").trim());
    const hCm = parseFloat((height || "").toString().replace(",", ".").trim());
    if (!Number.isFinite(w) || !Number.isFinite(hCm) || w <= 0 || hCm <= 0)
      return null;
    const hM = hCm / 100;
    return w / (hM * hM);
  }, [weight, height]);

  function bmiPointsFrom(b: number) {
    if (b < 25) return 0;
    if (b < 30) return 1;
    if (b < 35) return 2;
    if (b < 40) return 3;
    return 4;
  }

  const bmiPoints = useMemo(
    () => (bmi == null ? 0 : bmiPointsFrom(bmi)),
    [bmi]
  );

  const riskScore = useMemo(() => {
    const agePts = parseInt(age) || 0;
    const sexPts = parseInt(sex) || 0;
    const activePts = physicallyActive ? -1 : 0;
    const htnPts = hypertension ? 1 : 0;
    const fmhPts = familyHistory ? 1 : 0;
    const bmiPts = bmi == null ? 0 : bmiPointsFrom(bmi);
    return bmiPts + agePts + sexPts + activePts + htnPts + fmhPts;
  }, [bmi, age, sex, physicallyActive, hypertension, familyHistory]);

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
          {/* INPUTS */}
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
                  placeholder="70"
                  unit="kg"
                />
                <UnitNumberInput
                  id="height"
                  label="Height"
                  value={height}
                  onChange={setHeight}
                  placeholder="170"
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

          {/* RESULTS */}
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
                    value={bmi == null ? "—" : String(bmiPoints)}
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
