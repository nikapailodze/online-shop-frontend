"use client";
import { useMemo, useState } from "react";
import styles from "../page.module.scss";

import SectionCard from "../components/SectionCard/SectionCard";
import RadioGroup from "../components/RadioGroup/RadioGroup";
import UnitNumberInput from "../components/UnitNumberInput/UnitNumberInput";
import CheckboxRow from "../components/CheckboxRow/CheckboxRow";
import Collapsible from "../components/Collapsible/Collapsible";

import { computeMetWHO1998, type Sex, type GlucoseCat } from "./compute";

export default function MetSyndromeWHO1998View() {
  const [sex, setSex] = useState<Sex>("");

  const [bmi, setBmi] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const [tg, setTg] = useState("");
  const [hdl, setHdl] = useState("");

  const [sbp, setSbp] = useState("");
  const [dbp, setDbp] = useState("");

  const [glucoseCat, setGlucoseCat] = useState<GlucoseCat>("");
  const [microalbuminuria, setMicroalbuminuria] = useState(false);

  const result = useMemo(
    () =>
      computeMetWHO1998({
        sex,
        bmi,
        waistCm: waist,
        hipCm: hip,
        tgMgdl: tg,
        hdlMgdl: hdl,
        sbp,
        dbp,
        glucoseCat,
        microalbuminuria,
      }),
    [sex, bmi, waist, hip, tg, hdl, sbp, dbp, glucoseCat, microalbuminuria]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Metabolic Syndrome Criteria (WHO 1998)</div>
          <div className={styles.subtitle}>
            Diagnostic: <strong>1 Required</strong> (insulin resistance) <strong>AND</strong> <strong>≥2 Other</strong> criteria.
          </div>
        </div>

        <div className={styles.grid}>
          {/* REQUIRED */}
          <SectionCard title="Required Criterion">
            <RadioGroup
              name="glucCat"
              value={glucoseCat}
              onChange={(v) => setGlucoseCat(v as GlucoseCat)}
              options={[
                { value: "normal", label: "Glucose: Normal" },
                { value: "IGT", label: "IGT" },
                { value: "IFG", label: "IFG" },
                { value: "DM", label: "Type 2 Diabetes" },
                { value: "reducedSensitivity", label: "Reduced insulin sensitivity" },
              ]}
              columns={2}
            />
          </SectionCard>

          {/* OTHER */}
          <SectionCard title="Other Criteria">
            <RadioGroup
              name="sex"
              value={sex}
              onChange={(v) => setSex(v as Sex)}
              options={[
                { value: "female", label: "Female" },
                { value: "male", label: "Male" },
              ]}
              columns={2}
            />

            <div className={styles.inline2}>
              <UnitNumberInput id="bmi" label="BMI" value={bmi} onChange={setBmi} placeholder="e.g. 31" unit="kg/m²" />
              <UnitNumberInput id="waist" label="Waist" value={waist} onChange={setWaist} placeholder="e.g. 95" unit="cm" />
            </div>

            <UnitNumberInput id="hip" label="Hip" value={hip} onChange={setHip} placeholder="e.g. 100" unit="cm" />

            <div className={styles.inline2}>
              <UnitNumberInput id="tg" label="Triglycerides" value={tg} onChange={setTg} placeholder="e.g. 160" unit="mg/dL" />
              <UnitNumberInput id="hdl" label="HDL cholesterol" value={hdl} onChange={setHdl} placeholder="e.g. 35" unit="mg/dL" />
            </div>

            <div className={styles.inline2}>
              <UnitNumberInput id="sbp" label="Systolic BP" value={sbp} onChange={setSbp} placeholder="e.g. 145" unit="mmHg" />
              <UnitNumberInput id="dbp" label="Diastolic BP" value={dbp} onChange={setDbp} placeholder="e.g. 92" unit="mmHg" />
            </div>

            <CheckboxRow
              id="micro"
              label="Microalbuminuria present"
              checked={microalbuminuria}
              onChange={setMicroalbuminuria}
            />
          </SectionCard>

          {/* RESULT */}
          <SectionCard title="Result">
            <div className={styles.stack}>
              {!result.complete && (
                <div className={styles.small} style={{ color: "#b45309" }}>
                  Important: Inputs must be complete to perform calculation.
                </div>
              )}

              {result.complete && (
                <>
                  <div style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 12, background: "#fbfbff", display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                    <span>Required criterion met</span>
                    <span>{result.requiredMet ? "Yes" : "No"}</span>
                  </div>

                  <div style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 12, background: "#fbfbff", display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                    <span>Other criteria met</span>
                    <span>{result.otherCount}</span>
                  </div>

                  <div style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 12, background: "#fbfbff", display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                    <span>Diagnostic (WHO 1998)</span>
                    <span>{result.diagnosis ? "Meets criteria" : "Does not meet"}</span>
                  </div>
                </>
              )}

              <Collapsible title="Notes & Criteria">
                <div className={styles.small}>
                  Required: insulin resistance (IGT, IFG, T2DM, or reduced sensitivity).  
                  Other: obesity (BMI &gt;30 or WHR &gt;0.9 male / &gt;0.85 female), TG ≥150 or HDL low, BP ≥140/90, glucose abnormal, or microalbuminuria.  
                  Diagnosis = required + ≥2 other criteria.
                </div>
              </Collapsible>

              <Collapsible title="References">
                <div className={styles.small}>
                  WHO 1998 metabolic syndrome criteria. Grundy SM et al, Circulation 2005;112:2735–52.  
                  Cross-ref: ATP III 2001, AHA/NHLBI 2005, IDF 2005, EGIR, AACE 2003.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
