"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import RadioGroup from "@/app/calculators/components/RadioGroup/RadioGroup";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeOracle, type YesNo } from "./compute";

export default function OracleOsteoporosisView() {
  const [ageYears, setAgeYears] = useState("");
  const [bmi, setBmi] = useState("");
  const [hrTx, setHrTx] = useState<YesNo>("");
  const [hxFx, setHxFx] = useState<YesNo>("");
  const [ubpi, setUbpi] = useState("");
  const [precision, setPrecision] = useState("2");

  const result = useMemo(
    () =>
      computeOracle({
        ageYears,
        bmi,
        hrTx,
        hxFx,
        ubpi,
        precision,
      }),
    [ageYears, bmi, hrTx, hxFx, ubpi, precision]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            Osteoporosis Risk Assessment by Composite Linear Estimate (ORACLE score)
          </div>
          <div className={styles.subtitle}>
            ORACLE combines Age, BMI, HRTx, prior fracture (after 45), and UBPI into a single estimate.
          </div>
        </div>

        <div className={styles.grid}>
          {}
          <SectionCard title="Inputs">
            <div className={styles.stack}>
              <div className={styles.inline2}>
                <UnitNumberInput
                  id="age"
                  label="Age"
                  value={ageYears}
                  onChange={setAgeYears}
                  placeholder="e.g. 67"
                  unit="yr"
                />
                <UnitNumberInput
                  id="bmi"
                  label="BMI"
                  value={bmi}
                  onChange={setBmi}
                  placeholder="e.g. 22.7"
                  unit="kg/m²"
                />
              </div>

              <div className={styles.inline2}>
                <RadioGroup
                  name="hrtx"
                  value={hrTx}
                  onChange={(v) => setHrTx(v as YesNo)}
                  options={[
                    { value: "yes", label: "HRTx: Yes (1)" },
                    { value: "no", label: "HRTx: No (0)" },
                  ]}
                  columns={2}
                />
                <RadioGroup
                  name="hxfy"
                  value={hxFx}
                  onChange={(v) => setHxFx(v as YesNo)}
                  options={[
                    { value: "yes", label: "HxFx ≥45y: Yes (1)" },
                    { value: "no", label: "HxFx ≥45y: No (0)" },
                  ]}
                  columns={2}
                />
              </div>

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="ubpi"
                  label="UBPI (Ultrasound Bone Profile Index)"
                  value={ubpi}
                  onChange={setUbpi}
                  placeholder="e.g. 0.15"
                  unit="index"
                />
                <UnitNumberInput
                  id="precision"
                  label="Decimal precision"
                  value={precision}
                  onChange={setPrecision}
                  placeholder="2"
                  unit=""
                />
              </div>
            </div>
          </SectionCard>

          {}
          <SectionCard title="Result">
            <div className={styles.stack}>
              {!result.complete && (
                <div className={styles.small} style={{ color: "#b45309" }}>
                  Important: Inputs must be complete to perform calculation.
                </div>
              )}

              {result.complete && (
                <>
                  <div
                    style={{
                      padding: 16,
                      border: "1px solid #e5e7eb",
                      borderRadius: 12,
                      background: "#fbfbff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontWeight: 700,
                    }}
                  >
                    <span>ORACLE score</span>
                    <span>{result.scoreText}</span>
                  </div>

                  <div
                    style={{
                      padding: 16,
                      border: "1px solid #e5e7eb",
                      borderRadius: 12,
                      background: "#fbfbff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontWeight: 600,
                    }}
                  >
                    <span>Interpretation</span>
                    <span>{result.category}</span>
                  </div>
                </>
              )}

              <Collapsible title="Cutoffs">
                <div className={styles.small}>
                  Score ≥0 and ≤0.26: <strong>Lower Risk</strong><br />
                  &gt;0.26 and ≤0.32: <strong>High Risk (50% specificity)</strong><br />
                  &gt;0.32: <strong>High Risk (Sensitivity 76%)</strong><br />
                  Sensitivity ≈90% at scores ≥0.27 (per study).
                </div>
              </Collapsible>

              <Collapsible title="Equation">
                <div className={styles.small}>
                  ORACLE = −1 / [ (0.02×Age) − (0.13×BMI) − (0.39×HRTx) + (0.74×HxFx) − (3×UBPI) ]<br />
                  HRTx: Yes=1, No=0; HxFx: history of fracture after age 45 (Yes=1, No=0). UBPI: Ultrasound Bone Profile Index.
                </div>
              </Collapsible>

              <Collapsible title="Notes & References">
                <div className={styles.small}>
                  BMI: Body Mass Index. HRTx: Hormone Replacement Therapy. HxFx: fracture ≥45y. UBPI: ultrasound index.<br />
                  Richy F, Deceulaer F, Ethgen O, et&nbsp;al. Development and validation of the ORACLE score. <em>Mayo Clin Proc.</em> 2004;79(11):1402–8. PubMed ID: 15544019.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
