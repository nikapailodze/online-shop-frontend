"use client";
import { useMemo, useState } from "react";
import styles from "../page.module.scss";

import SectionCard from "../components/SectionCard/SectionCard";
import RadioGroup from "../components/RadioGroup/RadioGroup";
import UnitNumberInput from "../components/UnitNumberInput/UnitNumberInput";
import Collapsible from "../components/Collapsible/Collapsible";

import { computeRisk7p5, type Inputs } from "./compute";

export default function Risk7p5yView() {
  const [age, setAge] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [sex, setSex] = useState<Inputs["sex"]>("");
  const [ma, setMa] = useState<Inputs["ma"]>("");
  const [fmh, setFmh] = useState<Inputs["fmh"]>("");
  const [fbs, setFbs] = useState("");
  const [sbp, setSbp] = useState("");
  const [hdl, setHdl] = useState("");
  const [precision, setPrecision] = useState<0 | 1 | 2 | 3 | 4>(2);

  const result = useMemo(
    () =>
      computeRisk7p5({
        age,
        heightIn,
        weightLb,
        sex,
        ma,
        fmh,
        fbs,
        sbp,
        hdl,
      }),
    [age, heightIn, weightLb, sex, ma, fmh, fbs, sbp, hdl]
  );

  const bmiStr =
    result.complete && result.bmi != null ? result.bmi.toFixed(precision) : "—";
  const termsStr =
    result.complete && result.terms != null
      ? result.terms.toFixed(precision)
      : "—";
  const riskStr =
    result.complete && result.riskPct != null
      ? result.riskPct.toFixed(precision) + "%"
      : "—";

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            Risk of Acquiring Diabetes Mellitus (7.5-year)
          </div>
          <div className={styles.subtitle}>
            Important: Inputs must be complete to perform calculation.
          </div>
        </div>

        <div className={styles.grid}>
          {}
          <SectionCard title="Input">
            <div className={styles.stack}>
              <div className={styles.inline2}>
                <UnitNumberInput
                  id="age"
                  label="Age"
                  value={age}
                  onChange={setAge}
                  placeholder="e.g. 48"
                  unit="yr"
                />
                <UnitNumberInput
                  id="height"
                  label="Height"
                  value={heightIn}
                  onChange={setHeightIn}
                  placeholder="e.g. 70"
                  unit="in"
                />
              </div>

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="weight"
                  label="Weight"
                  value={weightLb}
                  onChange={setWeightLb}
                  placeholder="e.g. 190"
                  unit="lb"
                />
                <UnitNumberInput
                  id="fbs"
                  label="FBS (fasting blood sugar)"
                  value={fbs}
                  onChange={setFbs}
                  placeholder="e.g. 105"
                  unit="mg/dL"
                />
              </div>

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="sbp"
                  label="Systolic Blood Pressure"
                  value={sbp}
                  onChange={setSbp}
                  placeholder="e.g. 128"
                  unit="mmHg"
                />
                <UnitNumberInput
                  id="hdl"
                  label="HDL Cholesterol"
                  value={hdl}
                  onChange={setHdl}
                  placeholder="e.g. 42"
                  unit="mg/dL"
                />
              </div>

              <div className={styles.inline2}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Sex</div>
                  <RadioGroup
                    name="sex"
                    value={sex}
                    onChange={(v) => setSex(v as Inputs["sex"])}
                    options={[
                      { value: "female", label: "Female (1)" },
                      { value: "male", label: "Male (0)" },
                    ]}
                    columns={2}
                  />
                </div>

                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>
                    MA (Ethnicity)
                  </div>
                  <RadioGroup
                    name="ma"
                    value={ma}
                    onChange={(v) => setMa(v as Inputs["ma"])}
                    options={[
                      { value: "ma", label: "Mexican American (1)" },
                      { value: "nhw", label: "Non-Hispanic white (0)" },
                    ]}
                    columns={1}
                  />
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>FMH DM</div>
                <RadioGroup
                  name="fmh"
                  value={fmh}
                  onChange={(v) => setFmh(v as Inputs["fmh"])}
                  options={[
                    { value: "no", label: "No family history of DM (0)" },
                    {
                      value: "yes",
                      label: "Positive family history of DM (1)",
                    },
                  ]}
                  columns={1}
                />
              </div>
            </div>
          </SectionCard>

          {}
          <SectionCard title="Results">
            <div className={styles.stack}>
              {!result.complete && (
                <div className={styles.small} style={{ color: "#b45309" }}>
                  Important: Inputs must be complete to perform calculation.
                </div>
              )}

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
                <span>BMI</span>
                <span>
                  {bmiStr} <span className={styles.small}>kg/m²</span>
                </span>
              </div>

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
                <span>Terms</span>
                <span>
                  {termsStr} <span className={styles.small}>logit</span>
                </span>
              </div>

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
                <span>Risk of Diabetes</span>
                <span>{riskStr}</span>
              </div>

              <div className={styles.inline2}>
                <div className={styles.small}>Decimal Precision</div>
                <select
                  value={precision}
                  onChange={(e) =>
                    setPrecision(Number(e.target.value) as 0 | 1 | 2 | 3 | 4)
                  }
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>

              <Collapsible title="Notes & Equations used">
                <div className={styles.small}>
                  <p>
                    <strong>BMI</strong> is body mass index.
                  </p>
                  <p>
                    <strong>FBS</strong> is fasting blood sugar.
                  </p>
                  <p>
                    A positive <strong>FMH DM</strong> means at least one parent
                    or sibling has diabetes.
                  </p>
                  <p>
                    <strong>BMI</strong> = (Weight/2.205) / (Height/39.37)
                    <sup>2</sup>
                  </p>
                  <p>
                    <strong>Terms</strong> = 0.028×Age + 0.661×Sex + 0.412×MA +
                    0.079×FBS + 0.018×SBP − 0.039×HDL + 0.07×BMI + 0.481×FMH −
                    13.415
                  </p>
                  <p>
                    <strong>Risk</strong> = 100 / (1 + e<sup>−Terms</sup>)
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
