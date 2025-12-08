"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeSodiumCorrection, type GlucoseUnit } from "./compute";

export default function SodiumCorrectionEmmettView() {
  const [measuredNa, setMeasuredNa] = useState("");
  const [glucose, setGlucose] = useState("");
  const [gluUnit, setGluUnit] = useState<GlucoseUnit>("mgdl");
  const [precision, setPrecision] = useState<0 | 1 | 2 | 3>(1);

  const result = useMemo(
    () => computeSodiumCorrection({ measuredNa, glucose, glucoseUnit: gluUnit }),
    [measuredNa, glucose, gluUnit]
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
            Hyperglycemia (Emmett 2013) — Sodium Correction
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
                  id="measuredNa"
                  label="Measured plasma/serum sodium"
                  value={measuredNa}
                  onChange={setMeasuredNa}
                  placeholder="e.g. 130"
                  unit="mEq/L"
                />

                <div>
                  <UnitNumberInput
                    id="glucose"
                    label="Serum glucose"
                    value={glucose}
                    onChange={setGlucose}
                    placeholder={gluUnit === "mgdl" ? "e.g. 350" : "e.g. 19.4"}
                    unit={gluUnit === "mgdl" ? "mg/dL" : "mmol/L"}
                  />
                  {}
                  <div style={{ marginTop: 8 }}>
                    <select
                      value={gluUnit}
                      onChange={(e) => setGluUnit(e.target.value as GlucoseUnit)}
                      style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
                    >
                      <option value="mgdl">mg/dL</option>
                      <option value="mmolL">mmol/L</option>
                    </select>
                  </div>
                </div>
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
                <span>Estimated (corrected) plasma sodium</span>
                <span>
                  {correctedStr} <span className={styles.small}>mEq/L</span>
                </span>
              </div>

              <div className={styles.inline2}>
                <div className={styles.small}>Decimal Precision</div>
                <select
                  value={precision}
                  onChange={(e) => setPrecision(Number(e.target.value) as 0 | 1 | 2 | 3)}
                  style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>

              <Collapsible title="Notes & Equations used">
                <div className={styles.small}>
                  <p>
                    *The estimated (corrected) plasma sodium is a rough estimate of how much
                    the serum sodium concentration will rise as hyperglycemia is corrected.
                  </p>
                  <p>
                    <strong>Equation</strong> (Emmett 2013):
                    <br />
                    corrected Na = measured Na + 2 × ((glucose − 100) / 100)
                  </p>
                  <p>
                    If glucose is entered in mmol/L, it is internally converted to mg/dL using 18.015.
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
