"use client";
import { useMemo, useState } from "react";
import styles from "../page.module.scss";

import SectionCard from "../components/SectionCard/SectionCard";
import RadioGroup from "../components/RadioGroup/RadioGroup";
import UnitNumberInput from "../components/UnitNumberInput/UnitNumberInput";
import CheckboxRow from "../components/CheckboxRow/CheckboxRow";
import Collapsible from "../components/Collapsible/Collapsible";

import {
  computeMetAACE2003,
  type Sex,
  type RequiredIR,
  type GlucoseCat,
} from "./compute";

export default function MetSyndromeAACE2003View() {
  // Required
  const [requiredIR, setRequiredIR] = useState<RequiredIR>(""); // IGT/IFG
  // Other
  const [bmi, setBmi] = useState("");
  const [sex, setSex] = useState<Sex>("");
  const [tg, setTg] = useState("");
  const [hdl, setHdl] = useState("");
  const [sbp, setSbp] = useState("");
  const [dbp, setDbp] = useState("");
  const [glucoseCatOther, setGlucoseCatOther] = useState<GlucoseCat>("");
  const [otherIR, setOtherIR] = useState(false);

  const result = useMemo(
    () =>
      computeMetAACE2003({
        requiredIR,
        bmi,
        sex,
        tg,
        hdl,
        sbp,
        dbp,
        glucoseCatOther,
        otherIR,
      }),
    [requiredIR, bmi, sex, tg, hdl, sbp, dbp, glucoseCatOther, otherIR]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            Metabolic Syndrome Criteria (AACE 2003)
          </div>
          <div className={styles.subtitle}>
            Diagnostic: <strong>1 Required</strong> (IGT or IFG){" "}
            <strong>AND</strong> <strong>≥1 Other</strong> criterion.
          </div>
        </div>

        <div className={styles.grid}>
          {/* REQUIRED */}
          <SectionCard title="Required Criteria">
            <div className={styles.stack}>
              <RadioGroup
                name="requiredIR"
                value={requiredIR}
                onChange={(v) => setRequiredIR(v as RequiredIR)}
                options={[
                  { value: "IGT", label: "Insulin resistance: IGT" },
                  { value: "IFG", label: "Insulin resistance: IFG" },
                  { value: "", label: "None / not present" },
                ]}
                columns={1}
              />
            </div>
          </SectionCard>

          {/* OTHER */}
          <SectionCard title="Other Criteria">
            <div className={styles.stack}>
              <div className={styles.inline2}>
                <UnitNumberInput
                  id="bmi"
                  label="BMI"
                  value={bmi}
                  onChange={setBmi}
                  placeholder="e.g. 28"
                  unit="kg/m²"
                />
                <RadioGroup
                  name="sex"
                  value={sex}
                  onChange={(v) => setSex(v as Sex)}
                  options={[
                    { value: "female", label: "Female (HDL < 50)" },
                    { value: "male", label: "Male (HDL < 40)" },
                  ]}
                  columns={2}
                />
              </div>

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="tg"
                  label="Triglycerides"
                  value={tg}
                  onChange={setTg}
                  placeholder="e.g. 180"
                  unit="mg/dL"
                />
                <UnitNumberInput
                  id="hdl"
                  label="HDL-C"
                  value={hdl}
                  onChange={setHdl}
                  placeholder="e.g. 38"
                  unit="mg/dL"
                />
              </div>

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="sbp"
                  label="Systolic BP"
                  value={sbp}
                  onChange={setSbp}
                  placeholder="e.g. 132"
                  unit="mmHg"
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

              <RadioGroup
                name="glucOther"
                value={glucoseCatOther}
                onChange={(v) => setGlucoseCatOther(v as GlucoseCat)}
                options={[
                  { value: "normal", label: "Glucose: Normal" },
                  { value: "IGT", label: "Glucose: IGT (not DM)" },
                  { value: "IFG", label: "Glucose: IFG (not DM)" },
                  { value: "DM", label: "Glucose: Diabetes (DM)" },
                ]}
                columns={2}
              />

              <CheckboxRow
                id="otherIR"
                label="Other features of insulin resistance"
                checked={otherIR}
                onChange={setOtherIR}
              />
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
                    <span>Diagnostic (AACE 2003)</span>
                    <span>
                      {result.diagnosis ? "Meets criteria" : "Does not meet"}
                    </span>
                  </div>

                  {/* Optional: show which were positive */}
                  <div
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 10,
                      background: "#fff",
                    }}
                  >
                    <div className={styles.small}>
                      <strong>Other criteria breakdown</strong>
                    </div>
                    <div className={styles.small}>
                      BMI ≥25: {result.details!.bmi ? "Yes" : "No"} • TG/HDL
                      abnormal: {result.details!.tgHdl ? "Yes" : "No"} • BP
                      ≥130/85: {result.details!.bp ? "Yes" : "No"} • Glucose
                      IGT/IFG (not DM):{" "}
                      {result.details!.glucoseNotDM ? "Yes" : "No"} • Other IR
                      features: {result.details!.otherIR ? "Yes" : "No"}
                    </div>
                  </div>
                </>
              )}

              <Collapsible title="Notes & Criteria">
                <div className={styles.small}>
                  <p>
                    Diagnosis requires{" "}
                    <strong>Insulin resistance (IGT or IFG)</strong> plus{" "}
                    <strong>≥1</strong> of:
                  </p>
                  <ul style={{ marginTop: 8 }}>
                    <li>BMI ≥ 25 kg/m²</li>
                    <li>
                      TG ≥ 150 mg/dL and HDL &lt; 40 (men) or &lt; 50 (women)
                    </li>
                    <li>BP ≥ 130/≥ 85 mmHg</li>
                    <li>Glucose: IGT or IFG (not DM)</li>
                    <li>Other features of insulin resistance</li>
                  </ul>
                </div>
              </Collapsible>

              <Collapsible title="References">
                <div className={styles.small}>
                  AACE 2003 criteria (see also AHA/NHLBI 2005; ATP III 2001; WHO
                  1998; EGIR; IDF 2005).
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
