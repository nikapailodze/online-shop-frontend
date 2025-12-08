"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import RadioGroup from "@/app/calculators/components/RadioGroup/RadioGroup";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import CheckboxRow from "@/app/calculators/components/CheckboxRow/CheckboxRow";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeMetEGIR, type Sex, type RequiredIns, type GlucoseCat } from "./compute";

export default function MetSyndromeEGIRView() {
  const [requiredIns, setRequiredIns] = useState<RequiredIns>("");

  const [sex, setSex] = useState<Sex>("");
  const [waistCm, setWaistCm] = useState("");
  const [tg, setTg] = useState("");
  const [hdl, setHdl] = useState("");
  const [sbp, setSbp] = useState("");
  const [dbp, setDbp] = useState("");
  const [onBpRx, setOnBpRx] = useState(false);
  const [glucoseCat, setGlucoseCat] = useState<GlucoseCat>("");

  const result = useMemo(
    () =>
      computeMetEGIR({
        requiredIns,
        sex,
        waistCm,
        tgMgdl: tg,
        hdlMgdl: hdl,
        sbp,
        dbp,
        onBpRx,
        glucoseCat,
      }),
    [requiredIns, sex, waistCm, tg, hdl, sbp, dbp, onBpRx, glucoseCat]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Metabolic Syndrome Criteria (EGIR)</div>
          <div className={styles.subtitle}>
            Diagnostic: <strong>1 Required</strong> (plasma insulin &gt;75th percentile) <strong>AND</strong> <strong>≥2 Other</strong> criteria.
          </div>
        </div>

        <div className={styles.grid}>
          {}
          <SectionCard title="Required Criterion">
            <div className={styles.stack}>
              <RadioGroup
                name="requiredIns"
                value={requiredIns}
                onChange={(v) => setRequiredIns(v as RequiredIns)}
                options={[
                  { value: "gt75pct", label: "Plasma insulin > 75th percentile" },
                  { value: "", label: "Not above 75th percentile / unknown" },
                ]}
                columns={1}
              />
            </div>
          </SectionCard>

          {}
          <SectionCard title="Other Criteria">
            <div className={styles.stack}>
              <RadioGroup
                name="sex"
                value={sex}
                onChange={(v) => setSex(v as Sex)}
                options={[
                  { value: "female", label: "Female (waist ≥80 cm)" },
                  { value: "male", label: "Male (waist ≥94 cm)" },
                ]}
                columns={2}
              />

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="waist"
                  label="Waist circumference"
                  value={waistCm}
                  onChange={setWaistCm}
                  placeholder="e.g. 92"
                  unit="cm"
                />
                <UnitNumberInput
                  id="tg"
                  label="Triglycerides"
                  value={tg}
                  onChange={setTg}
                  placeholder="e.g. 175"
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
                  placeholder="e.g. 142"
                  unit="mmHg"
                />
              </div>

              <div className={styles.inline2}>
                <CheckboxRow
                  id="bpRx"
                  label="On blood pressure medication"
                  checked={onBpRx}
                  onChange={setOnBpRx}
                />
                <UnitNumberInput
                  id="dbp"
                  label="Diastolic BP"
                  value={dbp}
                  onChange={setDbp}
                  placeholder="e.g. 92"
                  unit="mmHg"
                />
              </div>

              <RadioGroup
                name="glucCat"
                value={glucoseCat}
                onChange={(v) => setGlucoseCat(v as GlucoseCat)}
                options={[
                  { value: "normal", label: "Glucose: Normal" },
                  { value: "IGT", label: "Glucose: IGT (not DM)" },
                  { value: "IFG", label: "Glucose: IFG (not DM)" },
                  { value: "DM", label: "Glucose: Diabetes (DM)" },
                ]}
                columns={2}
              />
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
                    <span>Required criterion met</span>
                    <span>{result.requiredMet ? "Yes" : "No"}</span>
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
                    <span>Other criteria met</span>
                    <span>{result.otherCount}</span>
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
                    <span>Diagnostic (EGIR)</span>
                    <span>{result.diagnosis ? "Meets criteria" : "Does not meet"}</span>
                  </div>

                  {}
                  <div
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 10,
                      background: "#fff",
                    }}
                  >
                    <div className={styles.small}><strong>Other criteria breakdown</strong></div>
                    <div className={styles.small}>
                      Waist (sex-specific): {result.details!.waist ? "Yes" : "No"} •
                      TG ≥150 or HDL &lt;39: {result.details!.tgHdl ? "Yes" : "No"} •
                      BP ≥140/90 or on Rx: {result.details!.bp ? "Yes" : "No"} •
                      Glucose IGT/IFG (not DM): {result.details!.glucoseNotDM ? "Yes" : "No"}
                    </div>
                  </div>
                </>
              )}

              <Collapsible title="Notes & Criteria">
                <div className={styles.small}>
                  Required: plasma insulin &gt;75th percentile. Other: waist (male ≥94 cm; female ≥80 cm),
                  TG ≥150 mg/dL or HDL &lt;39 mg/dL, BP ≥140/≥90 or on therapy, glucose IGT/IFG (not DM).
                  Diagnosis requires required + ≥2 other criteria.
                </div>
              </Collapsible>

              <Collapsible title="References">
                <div className={styles.small}>
                  EGIR criteria (see also AHA/NHLBI 2005; ATP III 2001; WHO 1998; AACE 2003; IDF 2005).
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
