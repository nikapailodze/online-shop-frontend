"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeQUICKI } from "./compute";

export default function QuickiView() {
  const [insulin, setInsulin] = useState("");
  const [glucose, setGlucose] = useState("");
  const [precision, setPrecision] = useState<0 | 1 | 2 | 3 | 4>(2);

  const result = useMemo(
    () => computeQUICKI({ insulin, glucose }),
    [insulin, glucose]
  );

  const quickiStr =
    result.complete && result.quicki != null
      ? result.quicki.toFixed(precision)
      : "—";

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>QUICKI Formula for Insulin Resistance</div>
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
                  unit="μIU/mL"
                />
                <UnitNumberInput
                  id="glucose"
                  label="Fasting Glucose"
                  value={glucose}
                  onChange={setGlucose}
                  placeholder="e.g. 90"
                  unit="mg/dL"
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
                <span>QUICKI</span>
                <span>{quickiStr}</span>
              </div>

              <div className={styles.inline2}>
                <div className={styles.small}>Decimal Precision</div>
                <select
                  value={precision}
                  onChange={(e) => setPrecision(Number(e.target.value) as 0 | 1 | 2 | 3 | 4)}
                  style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
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
                  <p>QUICKI = 1 / (log<sub>10</sub>(Fasting Insulin) + log<sub>10</sub>(Fasting Glucose))</p>
                  <p>QUICKI stands for <strong>QU</strong>antitative <strong>I</strong>nsulin sensitivity <strong>ChecK</strong> <strong>I</strong>ndex.</p>
                </div>
              </Collapsible>

              <Collapsible title="References">
                <div className={styles.small}>
                  Katz A, Nambi SS, Mather K, Baron AD, et al. Quantitative insulin sensitivity check index
                  (QUICKI). <em>J Clin Endocrinol Metab.</em> 2000;85(7):2402–10. PMID: 10902785.
                  <br />
                  Rabasa-Lhoret R, Bastard JP, Jan V, et al. Modified QUICKI correlates with clamp better than other fasting indices.
                  <em> J Clin Endocrinol Metab.</em> 2003;88(10):4917–23. PMID: 14557474.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
