"use client";
import { useMemo, useState } from "react";
import styles from "../page.module.scss";

import SectionCard from "../components/SectionCard/SectionCard";
import RadioGroup from "../components/RadioGroup/RadioGroup";
import UnitNumberInput from "../components/UnitNumberInput/UnitNumberInput";
import CheckboxRow from "../components/CheckboxRow/CheckboxRow";
import Collapsible from "../components/Collapsible/Collapsible";

import { computeMetIDF2005, type Sex, type Ethnicity } from "./compute";

export default function MetSyndromeIDF2005View() {
  const [sex, setSex] = useState<Sex>("");
  const [ethnicity, setEthnicity] = useState<Ethnicity>("");

  const [waistCm, setWaistCm] = useState("");
  const [tg, setTg] = useState("");
  const [onTgRx, setOnTgRx] = useState(false);

  const [hdl, setHdl] = useState("");
  const [onHdlRx, setOnHdlRx] = useState(false);

  const [sbp, setSbp] = useState("");
  const [dbp, setDbp] = useState("");
  const [onBpRx, setOnBpRx] = useState(false);

  const [fpg, setFpg] = useState("");
  const [hasDiabetes, setHasDiabetes] = useState(false);

  const result = useMemo(
    () =>
      computeMetIDF2005({
        sex,
        ethnicity,
        waistCm,
        tgMgdl: tg,
        onTgRx,
        hdlMgdl: hdl,
        onHdlRx,
        sbp,
        dbp,
        onBpRx,
        fpgMgdl: fpg,
        hasDiabetes,
      }),
    [sex, ethnicity, waistCm, tg, onTgRx, hdl, onHdlRx, sbp, dbp, onBpRx, fpg, hasDiabetes]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Metabolic Syndrome Criteria (IDF 2005)</div>
          <div className={styles.subtitle}>
            Diagnostic: <strong>1 Required</strong> (abdominal obesity) <strong>AND</strong> <strong>≥2 Other</strong> criteria.
          </div>
        </div>

        <div className={styles.grid}>
          {}
          <SectionCard title="Required Criterion">
            <div className={styles.stack}>
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

              <RadioGroup
                name="ethnicity"
                value={ethnicity}
                onChange={(v) => setEthnicity(v as Ethnicity)}
                options={[
                  { value: "europid", label: "Europid" },
                  { value: "south_asian_chinese_japanese", label: "South Asian/Chinese/Japanese" },
                  { value: "south_central_american", label: "South & Central American" },
                  { value: "sub_saharan_african", label: "Sub-Saharan African" },
                  { value: "eastern_med_middle_east", label: "Eastern Mediterranean & Middle East" },
                ]}
                columns={1}
              />

              <UnitNumberInput
                id="waist"
                label="Waist circumference"
                value={waistCm}
                onChange={setWaistCm}
                placeholder="e.g. 94"
                unit="cm"
              />
            </div>
          </SectionCard>

          {}
          <SectionCard title="Other Criteria">
            <div className={styles.stack}>
              <div className={styles.inline2}>
                <UnitNumberInput
                  id="tg"
                  label="Triglycerides"
                  value={tg}
                  onChange={setTg}
                  placeholder="e.g. 160"
                  unit="mg/dL"
                />
                <CheckboxRow
                  id="tgRx"
                  label="On TG-lowering Rx"
                  checked={onTgRx}
                  onChange={setOnTgRx}
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
                <CheckboxRow
                  id="hdlRx"
                  label="On HDL-C Rx"
                  checked={onHdlRx}
                  onChange={setOnHdlRx}
                />
              </div>

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="sbp"
                  label="Systolic BP"
                  value={sbp}
                  onChange={setSbp}
                  placeholder="e.g. 135"
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

              <CheckboxRow
                id="bpRx"
                label="On BP medication"
                checked={onBpRx}
                onChange={setOnBpRx}
              />

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="fpg"
                  label="Fasting glucose"
                  value={fpg}
                  onChange={setFpg}
                  placeholder="e.g. 102"
                  unit="mg/dL"
                />
                <CheckboxRow
                  id="dm"
                  label="Has diagnosed diabetes"
                  checked={hasDiabetes}
                  onChange={setHasDiabetes}
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
                    <span>Diagnostic (IDF 2005)</span>
                    <span>{result.diagnosis ? "Meets criteria" : "Does not meet"}</span>
                  </div>

                  <div style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 10, background: "#fff" }}>
                    <div className={styles.small}><strong>Other criteria breakdown</strong></div>
                    <div className={styles.small}>
                      TG ≥150 or Rx: {result.details!.tg ? "Yes" : "No"} •
                      Low HDL or Rx: {result.details!.hdl ? "Yes" : "No"} •
                      BP ≥130/85 or Rx: {result.details!.bp ? "Yes" : "No"} •
                      Glucose ≥100 or DM: {result.details!.glucose ? "Yes" : "No"}
                    </div>
                  </div>
                </>
              )}

              <Collapsible title="Notes & Criteria">
                <div className={styles.small}>
                  Required: abdominal obesity (population-specific waist). Other: TG ≥150 mg/dL or Rx, HDL &lt;40 mg/dL (men) or &lt;50 mg/dL (women) or Rx, BP ≥130/85 or Rx, glucose ≥100 mg/dL or DM. Diagnosis = required + ≥2 other criteria.
                </div>
              </Collapsible>

              <Collapsible title="References">
                <div className={styles.small}>
                  International Diabetes Federation (IDF 2005). Grundy SM et al, Circulation 2005;112:2735–52.
                  See also AHA/NHLBI 2005, ATP III 2001, WHO 1998, EGIR, AACE 2003.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
