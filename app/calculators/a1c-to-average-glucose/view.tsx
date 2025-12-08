"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import { computeConversions, type Fields } from "./compute";
import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

export default function A1cToAverageGlucoseView() {
  const [a1cPct, setA1cPct] = useState("");
  const [a1cIfcc, setA1cIfcc] = useState("");
  const [eagMg, setEagMg] = useState("");
  const [eagMmol, setEagMmol] = useState("");
  const [active, setActive] = useState<Fields | "">("");
  const [precision, setPrecision] = useState<0 | 1 | 2 | 3>(2);

  const result = useMemo(
    () => computeConversions({ a1cPct, a1cIfcc, eagMg, eagMmol, active }),
    [a1cPct, a1cIfcc, eagMg, eagMmol, active]
  );

  function fmt(n: number | undefined) {
    return n == null || !Number.isFinite(n) ? "—" : n.toFixed(precision);
  }

  const display = {
    a1cPct:
      active === "a1cPct" ? a1cPct : result ? fmt(result.a1cPct) : "",
    a1cIfcc:
      active === "a1cIfcc" ? a1cIfcc : result ? fmt(result.a1cIfcc) : "",
    eagMg:
      active === "eagMg" ? eagMg : result ? fmt(result.eagMg) : "",
    eagMmol:
      active === "eagMmol" ? eagMmol : result ? fmt(result.eagMmol) : "",
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            Glycemic Assessment: A1C to Average Glucose Conversions
          </div>
          <div className={styles.subtitle}>
            Type any one value; the other three will be calculated automatically.
          </div>
        </div>

        <div className={styles.grid}>
          <SectionCard title="Input (enter any ONE field)">
            <div className={styles.stack}>
              <div className={styles.inline2}>
                <UnitNumberInput
                  id="a1cPct"
                  label="A1C (DCCT)"
                  unit="%"
                  value={display.a1cPct}
                  onFocus={() => setActive("a1cPct")}
                  onChange={(v) => {
                    setActive("a1cPct");
                    setA1cPct(v);
                  }}
                  placeholder="e.g. 7.2"
                />

                <UnitNumberInput
                  id="a1cIfcc"
                  label="A1C (IFCC)"
                  unit="mmol/mol"
                  value={display.a1cIfcc}
                  onFocus={() => setActive("a1cIfcc")}
                  onChange={(v) => {
                    setActive("a1cIfcc");
                    setA1cIfcc(v);
                  }}
                  placeholder="e.g. 55"
                />
              </div>

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="eagMg"
                  label="Estimated average glucose"
                  unit="mg/dL"
                  value={display.eagMg}
                  onFocus={() => setActive("eagMg")}
                  onChange={(v) => {
                    setActive("eagMg");
                    setEagMg(v);
                  }}
                  placeholder="e.g. 160"
                />

                <UnitNumberInput
                  id="eagMmol"
                  label="Estimated average glucose (SI)"
                  unit="mmol/L"
                  value={display.eagMmol}
                  onFocus={() => setActive("eagMmol")}
                  onChange={(v) => {
                    setActive("eagMmol");
                    setEagMmol(v);
                  }}
                  placeholder="e.g. 8.9"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Results">
            <div className={styles.stack}>
              {!active && (
                <div className={styles.small} style={{ color: "#b45309" }}>
                  Click any one input field to enter a value. The rest will be calculated.
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
                <span>Precision</span>
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

              <Collapsible title="Notes & Equations used">
                <div className={styles.small}>
                  <p><strong>A1C</strong> = hemoglobin A1C.</p>
                  <p><strong>DCCT</strong> = Diabetes Control and Complications Trial.</p>
                  <p><strong>IFCC</strong> = International Federation of Clinical Chemistry.</p>

                  <p><strong>When A1C(%) is entered:</strong></p>
                  <p>A1C(mmol/mol) = 10.929 × (A1C(%) − 2.15)</p>
                  <p>eAG (mg/dL) = 28.7 × A1C(%) − 46.7</p>
                  <p>eAG (mmol/L) = eAG (mg/dL) / 18.015</p>

                  <p><strong>When A1C(mmol/mol) is entered:</strong></p>
                  <p>A1C(%) = A1C(mmol/mol) / 10.929 + 2.15</p>
                  <p>eAG (mg/dL) = 28.7 × A1C(%) − 46.7</p>
                  <p>eAG (mmol/L) = eAG (mg/dL) / 18.015</p>

                  <p><strong>When eAG (mg/dL) is entered:</strong></p>
                  <p>A1C(%) = (eAG (mg/dL) + 46.7) / 28.7</p>
                  <p>A1C(mmol/mol) = 10.929 × (A1C(%) − 2.15)</p>
                  <p>eAG (mmol/L) = eAG (mg/dL) / 18.015</p>

                  <p><strong>When eAG (mmol/L) is entered:</strong></p>
                  <p>eAG (mg/dL) = eAG (mmol/L) × 18.015</p>
                  <p>A1C(%) = (eAG (mg/dL) + 46.7) / 28.7</p>
                  <p>A1C(mmol/mol) = 10.929 × (A1C(%) − 2.15)</p>
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
