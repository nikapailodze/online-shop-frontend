"use client";
import { useMemo, useState } from "react";
import styles from "../page.module.scss";

import SectionCard from "../components/SectionCard/SectionCard";
import RadioGroup from "../components/RadioGroup/RadioGroup";
import UnitNumberInput from "../components/UnitNumberInput/UnitNumberInput";
import Collapsible from "../components/Collapsible/Collapsible";

import { computeMetAtpIII, type Sex } from "./compute";

export default function MetSyndromeAtpIIIView() {
  const [sex, setSex] = useState<Sex>("");

  const [waistIn, setWaistIn] = useState("");
  const [tg, setTg] = useState("");
  const [hdl, setHdl] = useState("");
  const [sbp, setSbp] = useState("");
  const [dbp, setDbp] = useState("");
  const [fpg, setFpg] = useState("");

  const result = useMemo(
    () =>
      computeMetAtpIII({
        sex,
        waistIn,
        tgMgdl: tg,
        hdlMgdl: hdl,
        sbp,
        dbp,
        fpgMgdl: fpg,
      }),
    [sex, waistIn, tg, hdl, sbp, dbp, fpg]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Metabolic Syndrome Criteria (ATP III)</div>
          <div className={styles.subtitle}>
            1 point each: abdominal obesity, TG ≥150, low HDL, BP ≥130/85, fasting glucose ≥110. Metabolic syndrome present if total ≥3.
          </div>
        </div>

        <div className={styles.grid}>
          {}
          <SectionCard title="Input">
            <div className={styles.stack}>
              <RadioGroup
                name="sex"
                value={sex}
                onChange={(v) => setSex(v as Sex)}
                options={[
                  { value: "female", label: "Female (waist &gt;35 in; HDL &lt;50)" },
                  { value: "male", label: "Male (waist &gt;40 in; HDL &lt;40)" },
                ]}
                columns={2}
              />

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="waist"
                  label="Waist circumference"
                  value={waistIn}
                  onChange={setWaistIn}
                  placeholder="e.g. 38"
                  unit="in"
                />
                <UnitNumberInput
                  id="tg"
                  label="Triglycerides"
                  value={tg}
                  onChange={setTg}
                  placeholder="e.g. 170"
                  unit="mg/dL"
                />
              </div>

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="hdl"
                  label="HDL cholesterol"
                  value={hdl}
                  onChange={setHdl}
                  placeholder="e.g. 38"
                  unit="mg/dL"
                />
                <UnitNumberInput
                  id="sbp"
                  label="Systolic BP"
                  value={sbp}
                  onChange={setSbp}
                  placeholder="e.g. 132"
                  unit="mmHg"
                />
              </div>

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="dbp"
                  label="Diastolic BP"
                  value={dbp}
                  onChange={setDbp}
                  placeholder="e.g. 86"
                  unit="mmHg"
                />
                <UnitNumberInput
                  id="fpg"
                  label="Fasting plasma glucose"
                  value={fpg}
                  onChange={setFpg}
                  placeholder="e.g. 112"
                  unit="mg/dL"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Results">
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
                    <span>Total Criteria Point Count</span>
                    <span>{result.points}</span>
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
                      fontWeight: 700,
                    }}
                  >
                    <span>Metabolic Syndrome</span>
                    <span>{result.met ? "Present (≥3)" : "Absent (0–2)"}</span>
                  </div>

                  <div
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 10,
                      background: "#fff",
                    }}
                  >
                    <div className={styles.small}><strong>Criteria breakdown</strong></div>
                    <div className={styles.small}>
                      Abdominal obesity: {result.breakdown!.waist ? "Yes" : "No"} • TG ≥150: {result.breakdown!.tg ? "Yes" : "No"} • HDL low: {result.breakdown!.hdl ? "Yes" : "No"} • BP ≥130/85: {result.breakdown!.bp ? "Yes" : "No"} • FPG ≥110: {result.breakdown!.glu ? "Yes" : "No"}
                    </div>
                  </div>
                </>
              )}

              <Collapsible title="Notes & Criteria">
                <div className={styles.small}>
                  ATP III: Abdominal obesity (male &gt;40 in; female &gt;35 in), TG ≥150 mg/dL, HDL (male &lt;40; female &lt;50), BP ≥130/≥85, FPG ≥110 mg/dL. Metabolic syndrome present if ≥3 criteria.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
