"use client";
import { useMemo, useState } from "react";
import styles from "../page.module.scss";

import SectionCard from "../components/SectionCard/SectionCard";
import RadioGroup from "../components/RadioGroup/RadioGroup";
import UnitNumberInput from "../components/UnitNumberInput/UnitNumberInput";
import CheckboxRow from "../components/CheckboxRow/CheckboxRow";
import Collapsible from "../components/Collapsible/Collapsible";

import { computeMetAHA2005, type Sex } from "./compute";

export default function MetSyndromeAHA2005View() {
  const [sex, setSex] = useState<Sex>("");

  // Inputs
  const [waistIn, setWaistIn] = useState("");
  const [tg, setTg] = useState("");
  const [onTgRx, setOnTgRx] = useState(false);
  const [hdl, setHdl] = useState("");
  const [onHdlRx, setOnHdlRx] = useState(false);
  const [sbp, setSbp] = useState("");
  const [dbp, setDbp] = useState("");
  const [onBpRx, setOnBpRx] = useState(false);
  const [fpg, setFpg] = useState("");
  const [onGluRx, setOnGluRx] = useState(false);

  const result = useMemo(
    () =>
      computeMetAHA2005({
        sex,
        waistIn,
        tgMgdl: tg,
        onTgRx,
        hdlMgdl: hdl,
        onHdlRx,
        sbp,
        dbp,
        onBpRx,
        fpgMgdl: fpg,
        onGluRx,
      }),
    [sex, waistIn, tg, onTgRx, hdl, onHdlRx, sbp, dbp, onBpRx, fpg, onGluRx]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Metabolic Syndrome Criteria (AHA/NHLBI 2005)</div>
          <div className={styles.subtitle}>
            1 point each: abdominal obesity, TG, HDL, BP, fasting glucose (or on Rx). Metabolic syndrome present if total ≥3.
          </div>
        </div>

        <div className={styles.grid}>
          {/* INPUTS */}
          <SectionCard title="Input">
            <div className={styles.stack}>
              <RadioGroup
                name="sex"
                value={sex}
                onChange={(v) => setSex(v as Sex)}
                options={[
                  { value: "female", label: "Female (waist ≥35 in; HDL <50)" },
                  { value: "male", label: "Male (waist ≥40 in; HDL <40)" },
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
              <CheckboxRow
                id="tgRx"
                label="On TG-lowering therapy"
                checked={onTgRx}
                onChange={setOnTgRx}
              />

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
                <CheckboxRow
                  id="hdlRx"
                  label="On HDL improvement therapy"
                  checked={onHdlRx}
                  onChange={setOnHdlRx}
                />
                <UnitNumberInput
                  id="dbp"
                  label="Diastolic BP"
                  value={dbp}
                  onChange={setDbp}
                  placeholder="e.g. 86"
                  unit="mmHg"
                />
              </div>

              <CheckboxRow
                id="bpRx"
                label="On blood pressure therapy"
                checked={onBpRx}
                onChange={setOnBpRx}
              />

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="fpg"
                  label="Fasting plasma glucose"
                  value={fpg}
                  onChange={setFpg}
                  placeholder="e.g. 108"
                  unit="mg/dL"
                />
                <CheckboxRow
                  id="gluRx"
                  label="On glucose-lowering therapy"
                  checked={onGluRx}
                  onChange={setOnGluRx}
                />
              </div>
            </div>
          </SectionCard>

          {/* RESULTS */}
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

                  {/* Optional: show which criteria hit */}
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
                      Abdominal obesity: {result.breakdown!.waist ? "Yes" : "No"} • TG: {result.breakdown!.tg ? "Yes" : "No"} • HDL: {result.breakdown!.hdl ? "Yes" : "No"} • BP: {result.breakdown!.bp ? "Yes" : "No"} • FPG: {result.breakdown!.glu ? "Yes" : "No"}
                    </div>
                  </div>
                </>
              )}

              <Collapsible title="Notes & Criteria">
                <div className={styles.small}>
                  Abdominal obesity (male ≥40 in; female ≥35 in), TG ≥150 mg/dL or on therapy,
                  HDL (male &lt;40; female &lt;50) or on therapy, BP ≥130/≥85 or on therapy,
                  FPG ≥100 mg/dL or on therapy. Metabolic syndrome present if ≥3 criteria.
                </div>
              </Collapsible>

              <Collapsible title="References">
                <div className={styles.small}>
                  AHA/NHLBI 2005 scientific statement (Circulation 2005;112:2735–52).
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
