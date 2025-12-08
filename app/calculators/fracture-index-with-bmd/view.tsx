"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import CheckboxRow from "@/app/calculators/components/CheckboxRow/CheckboxRow";
import RadioGroup from "@/app/calculators/components/RadioGroup/RadioGroup";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeFractureWithBmd, type Inputs } from "./compute";

export default function FractureIndexWithBmdView() {
  const [fxAfter50, setFxAfter50] = useState(false);
  const [maternalHipFxOver50, setMaternalHipFxOver50] = useState(false);
  const [wtLt125, setWtLt125] = useState(false);
  const [smoker, setSmoker] = useState(false);
  const [armAssistStand, setArmAssistStand] = useState(false);

  const [ageBand, setAgeBand] = useState<Inputs["ageBand"]>("");
  const [bmdBand, setBmdBand] = useState<Inputs["bmdBand"]>("");

  const [precision, setPrecision] = useState<0 | 1>(0);

  const result = useMemo(
    () =>
      computeFractureWithBmd({
        fxAfter50,
        maternalHipFxOver50,
        wtLt125,
        smoker,
        armAssistStand,
        ageBand,
        bmdBand,
      }),
    [
      fxAfter50,
      maternalHipFxOver50,
      wtLt125,
      smoker,
      armAssistStand,
      ageBand,
      bmdBand,
    ]
  );

  const totalStr =
    result.complete && result.totalPoints != null
      ? result.totalPoints.toFixed(precision)
      : "—";

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            Fracture Index WITH known Bone Mineral Density (BMD)
          </div>
          <div className={styles.subtitle}>
            Important: Inputs must be complete to perform calculation.
          </div>
        </div>

        <div className={styles.grid}>
          {}
          <SectionCard title="Clinical Criteria">
            <div className={styles.stack}>
              <CheckboxRow
                id="fxAfter50"
                label="Fractures after age 50 (1 point)"
                checked={fxAfter50}
                onChange={setFxAfter50}
                badge="+1"
                badgeTone="orange"
              />
              <CheckboxRow
                id="maternalHipFx"
                label="Maternal hip fracture over 50 years old (1 point)"
                checked={maternalHipFxOver50}
                onChange={setMaternalHipFxOver50}
                badge="+1"
                badgeTone="orange"
              />
              <CheckboxRow
                id="wtLt125"
                label="Body weight <125 lbs (1 point)"
                checked={wtLt125}
                onChange={setWtLt125}
                badge="+1"
                badgeTone="orange"
              />
              <CheckboxRow
                id="smoker"
                label="Smoker (1 point)"
                checked={smoker}
                onChange={setSmoker}
                badge="+1"
                badgeTone="orange"
              />
              <CheckboxRow
                id="armAssist"
                label="Arm assistance to stand from chair (2 points)"
                checked={armAssistStand}
                onChange={setArmAssistStand}
                badge="+2"
                badgeTone="orange"
              />
            </div>
          </SectionCard>

          <SectionCard title="Age & BMD">
            <div className={styles.stack}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Age</div>
                <RadioGroup
                  name="ageBand"
                  value={ageBand}
                  onChange={(v) => setAgeBand(v as Inputs["ageBand"])}
                  options={[
                    { value: "lt65", label: "Less than 65 (0)" },
                    { value: "65_69", label: "65–69 (1)" },
                    { value: "70_74", label: "70–74 (2)" },
                    { value: "75_79", label: "75–79 (3)" },
                    { value: "80_85", label: "80–85 (4)" },
                    { value: "ge85", label: "85 and over (5)" },
                  ]}
                  columns={2}
                />
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>BMD T Score</div>
                <RadioGroup
                  name="bmdBand"
                  value={bmdBand}
                  onChange={(v) => setBmdBand(v as Inputs["bmdBand"])}
                  options={[
                    { value: "ge_-1", label: "−1 or greater (0)" },
                    { value: "m1_to_m2", label: "between −1 and −2 (2)" },
                    { value: "m2_to_m2_5", label: "between −2 and −2.5 (3)" },
                    { value: "lt_m2_5", label: "less than −2.5 (4)" },
                  ]}
                  columns={1}
                />
              </div>
            </div>
          </SectionCard>

          {}
          <SectionCard title="Results">
            <div className={styles.stack}>
              {(!result.complete || result.totalPoints == null) && (
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
                <span>Total Criteria Point Count</span>
                <span>{totalStr}</span>
              </div>

              {}
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
                <span>5 Year Nonvertebral Fracture Risk</span>
                <span>{result.risks.nonvertebral ?? "—"}</span>
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
                <span>5 Year Hip Fracture Risk</span>
                <span>{result.risks.hip ?? "—"}</span>
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
                <span>5 Year Vertebral Fracture Risk</span>
                <span>{result.risks.vertebral ?? "—"}</span>
              </div>

              <div className={styles.inline2}>
                <div className={styles.small}>Decimal Precision (points)</div>
                <select
                  value={precision}
                  onChange={(e) => {
                    const p = Number(e.target.value) as 0 | 1;
                    setPrecision(p);
                  }}
                  style={{ padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                </select>
              </div>

              <Collapsible title="Risk Bands (5 years)">
                <div className={styles.small}>
                  <p>1–2 pts: 8.6% (nonvertebral), 0.4% (hip), 1.2% (vertebral)</p>
                  <p>3–4 pts: 13.1%, 0.9%, 2.5%</p>
                  <p>5 pts: 16.5%, 1.9%, 5.3%</p>
                  <p>6–7 pts: 19.8%, 3.9%, 7.1%</p>
                  <p>8–15 pts: 27.5%, 8.7%, 11.2%</p>
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
