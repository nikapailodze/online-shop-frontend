"use client";
import { useMemo, useState } from "react";
import styles from "../page.module.scss";

import SectionCard from "../components/SectionCard/SectionCard";
import UnitNumberInput from "../components/UnitNumberInput/UnitNumberInput";
import Collapsible from "../components/Collapsible/Collapsible";

import { computeSodiumCorrectionKatz } from "./compute";

export default function SodiumCorrectionKatzView() {
  const [measuredNa, setMeasuredNa] = useState(""); // mEq/L
  const [glucoseMgdl, setGlucoseMgdl] = useState(""); // mg/dL
  const [precision, setPrecision] = useState<0 | 1 | 2 | 3>(1);

  const result = useMemo(
    () => computeSodiumCorrectionKatz({ measuredNa, glucoseMgdl }),
    [measuredNa, glucoseMgdl]
  );

  const correctedStr =
    result.complete && result.correctedNa != null
      ? result.correctedNa.toFixed(precision)
      : "—";

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            Sodium Correction in Hyperglycemia (Katz 1973)
          </div>
          <div className={styles.subtitle}>
            Important: Inputs must be complete to perform calculation.
          </div>
        </div>

        <div className={styles.grid}>
          {/* INPUT */}
          <SectionCard title="Input">
            <div className={styles.stack}>
              <div className={styles.inline2}>
                <UnitNumberInput
                  id="measuredNa"
                  label="Measured Sodium"
                  value={measuredNa}
                  onChange={setMeasuredNa}
                  placeholder="e.g. 130"
                  unit="mEq/L"
                />
                <UnitNumberInput
                  id="glucose"
                  label="Glucose"
                  value={glucoseMgdl}
                  onChange={setGlucoseMgdl}
                  placeholder="e.g. 350"
                  unit="mg/dL"
                />
              </div>
            </div>
          </SectionCard>

          {/* RESULT */}
          <SectionCard title="Result">
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
                <span>Corrected Sodium</span>
                <span>
                  {correctedStr} <span className={styles.small}>mEq/L</span>
                </span>
              </div>

              <div className={styles.inline2}>
                <div className={styles.small}>Decimal Precision</div>
                <select
                  value={precision}
                  onChange={(e) =>
                    setPrecision(Number(e.target.value) as 0 | 1 | 2 | 3)
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
                </select>
              </div>

              <Collapsible title="Equations used">
                <div className={styles.small}>
                  <p>
                    <strong>Corrected Sodium</strong> = Measured Sodium + 0.016
                    × (Glucose − 100)
                  </p>
                  <p>Glucose is assumed in mg/dL for this equation.</p>
                </div>
              </Collapsible>

              <Collapsible title="References">
                <div className={styles.small}>
                  Katz MA. Hyperglycemia-induced hyponatremia—calculation of
                  expected serum sodium depression.
                  <em> N Engl J Med.</em> 1973;289(16):843–4. PMID: 4763428.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
