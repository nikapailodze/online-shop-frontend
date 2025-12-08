"use client";
import { useMemo, useState } from "react";
import styles from "../page.module.scss";

import SectionCard from "../components/SectionCard/SectionCard";
import CheckboxRow from "../components/CheckboxRow/CheckboxRow";
import RadioGroup from "../components/RadioGroup/RadioGroup";
import Collapsible from "../components/Collapsible/Collapsible";

import { computeFractureIndexWithoutBmd, type Inputs } from "./compute";

export default function FractureIndexWithoutBmdView() {
  const [fxAfter50, setFxAfter50] = useState(false);
  const [maternalHipFxOver50, setMaternalHipFxOver50] = useState(false);
  const [weightLt125lb, setWeightLt125lb] = useState(false);
  const [smoker, setSmoker] = useState(false);
  const [armAssistToStand, setArmAssistToStand] = useState(false);
  const [ageBand, setAgeBand] = useState<Inputs["ageBand"]>("");

  const result = useMemo(
    () =>
      computeFractureIndexWithoutBmd({
        fxAfter50,
        maternalHipFxOver50,
        weightLt125lb,
        smoker,
        armAssistToStand,
        ageBand,
      }),
    [
      fxAfter50,
      maternalHipFxOver50,
      weightLt125lb,
      smoker,
      armAssistToStand,
      ageBand,
    ]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Fracture Index WITHOUT known Bone Mineral Density (BMD)</div>
          <div className={styles.subtitle}>
            Important: Inputs must be complete to perform calculation.
          </div>
        </div>

        <div className={styles.grid}>
          {}
          <SectionCard title="Criteria">
            <div className={styles.stack}>
              <CheckboxRow
                id="fxAfter50"
                label="Fractures after age 50"
                checked={fxAfter50}
                onChange={setFxAfter50}
                badge="+1"
                badgeTone="orange"
              />
              <CheckboxRow
                id="maternalHip"
                label="Maternal hip fracture over 50 years old"
                checked={maternalHipFxOver50}
                onChange={setMaternalHipFxOver50}
                badge="+1"
                badgeTone="orange"
              />
              <CheckboxRow
                id="wtLt125"
                label="Body weight < 125 lbs"
                checked={weightLt125lb}
                onChange={setWeightLt125lb}
                badge="+1"
                badgeTone="orange"
              />
              <CheckboxRow
                id="smoker"
                label="Smoker"
                checked={smoker}
                onChange={setSmoker}
                badge="+1"
                badgeTone="orange"
              />
              <CheckboxRow
                id="armAssist"
                label="Arm assistance to stand from chair"
                checked={armAssistToStand}
                onChange={setArmAssistToStand}
                badge="+2"
                badgeTone="orange"
              />
            </div>
          </SectionCard>

          <SectionCard title="Age">
            <div className={styles.stack}>
              <RadioGroup
                name="ageBand"
                value={ageBand}
                onChange={(v) => setAgeBand(v as Inputs["ageBand"])}
                options={[
                  { value: "lt65", label: "Less than 65 (0)" },
                  { value: "65-69", label: "65–69 (1)" },
                  { value: "70-74", label: "70–74 (2)" },
                  { value: "75-79", label: "75–79 (3)" },
                  { value: "80-85", label: "80–85 (4)" },
                  { value: "ge85", label: "85 and over (5)" },
                ]}
                columns={2}
              />
            </div>
          </SectionCard>

          {}
          <SectionCard title="Results">
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
                <span>Total Criteria Point Count</span>
                <span>{result.complete && result.totalPoints != null ? result.totalPoints : "—"}</span>
              </div>

              {result.complete && result.risks && (
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
                    <span>5 Year Nonvertebral Fracture Risk</span>
                    <span>{result.risks.nonvertebral}%</span>
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
                    <span>{result.risks.hip}%</span>
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
                    <span>{result.risks.vertebral}%</span>
                  </div>
                </>
              )}

              <Collapsible title="References">
                <div className={styles.small}>
                  Black DM, Steinbuch M, Palermo L, et al. An assessment tool for predicting fracture
                  risk in postmenopausal women. <em>Osteoporos Int.</em> 2001;12(7):519–28. PMID: 11527048.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
