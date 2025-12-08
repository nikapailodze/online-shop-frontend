"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeHomaIr } from "./compute";

export default function HomaIrView() {
  const [insulin, setInsulin] = useState("");
  const [glucose, setGlucose] = useState("");
  const [precision, setPrecision] = useState<0 | 1 | 2 | 3>(2);

  const result = useMemo(
    () => computeHomaIr({ insulin, glucose }),
    [insulin, glucose]
  );

  const homaStr =
    result.complete && result.homaIr != null
      ? result.homaIr.toFixed(precision)
      : "—";

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>HOMA Formula: Homeostasis Model Assessment of Insulin Resistance</div>
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
                  id="insulin"
                  label="Fasting Insulin"
                  value={insulin}
                  onChange={setInsulin}
                  placeholder="e.g. 10"
                  unit="mIU/L"
                />
                <UnitNumberInput
                  id="glucose"
                  label="Fasting Glucose"
                  value={glucose}
                  onChange={setGlucose}
                  placeholder="e.g. 5.2"
                  unit="mmol/L"
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
                <span>HOMA-IR</span>
                <span>{homaStr}</span>
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

              <Collapsible title="Equations used">
                <div className={styles.small}>
                  <p><strong>HOMA-IR</strong> = Fasting Insulin (mIU/L) × Fasting Glucose (mmol/L) ÷ 22.5</p>
                </div>
              </Collapsible>

              <Collapsible title="References">
                <div className={styles.small}>
                  Matthews DR, Hosker JP, Rudenski AS, et al. Homeostasis model assessment:
                  insulin resistance and beta-cell function from fasting plasma glucose and insulin
                  concentrations in man. <em>Diabetologia.</em> 1985;28(7):412-9. PMID: 3899825.
                  <br />
                  Duncan MH, Singh BM, Wise PH, et al. A simple measure of insulin resistance.
                  <em> Lancet.</em> 1995;346(8967):120-1. PMID: 7603193.
                  <br />
                  Knopp JL, Holder-Pearson L, Chase JG. Insulin Units and Conversion Factors…
                  <em> J Diabetes Sci Technol.</em> 2019;13(3):597-600. PMID: 30318910.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
